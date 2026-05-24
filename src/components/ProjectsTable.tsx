import { ActionIcon, Anchor, Skeleton, Table, Text, Tooltip } from '@mantine/core'
import { IconBook, IconBrandGithub, IconExternalLink } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

function IconLink({ href, label, icon }: { href?: string; label: string; icon: React.ReactNode }) {
  if (href) {
    return (
      <Tooltip label={label} withArrow>
        <ActionIcon
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          variant="subtle"
          size="sm"
          aria-label={label}
        >
          {icon}
        </ActionIcon>
      </Tooltip>
    )
  }
  return (
    <Tooltip label={`No ${label.toLowerCase()}`} withArrow>
      <ActionIcon variant="transparent" size="sm" disabled aria-label={`No ${label.toLowerCase()}`} style={{ opacity: 0.2 }}>
        {icon}
      </ActionIcon>
    </Tooltip>
  )
}

interface ProjectsTableProps {
  limit?: number
}

export function ProjectsTable({ limit }: ProjectsTableProps) {
  const { projects, loading } = useGitHubRepos()
  const items = limit ? projects.slice(0, limit) : projects

  if (loading && items.length === 0) {
    return (
      <Table withRowBorders verticalSpacing={4} fz="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th w={36} />
            <Table.Th w={36} />
            <Table.Th w={36} />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array.from({ length: limit ?? 4 }).map((_, i) => (
            <Table.Tr key={i}>
              <Table.Td><Skeleton height={14} width="60%" radius="sm" /></Table.Td>
              <Table.Td><Skeleton height={20} width={20} radius="sm" mx="auto" /></Table.Td>
              <Table.Td><Skeleton height={20} width={20} radius="sm" mx="auto" /></Table.Td>
              <Table.Td><Skeleton height={20} width={20} radius="sm" mx="auto" /></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    )
  }

  if (!loading && items.length === 0) {
    return <Text fz="sm" c="dimmed">No projects found.</Text>
  }

  return (
    <>
      <Table withRowBorders highlightOnHover verticalSpacing={4} fz="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th w={36} style={{ textAlign: 'center' }}>
              <Tooltip label="GitHub" withArrow><span><IconBrandGithub size={12} /></span></Tooltip>
            </Table.Th>
            <Table.Th w={36} style={{ textAlign: 'center' }}>
              <Tooltip label="Demo" withArrow><span><IconExternalLink size={12} /></span></Tooltip>
            </Table.Th>
            <Table.Th w={36} style={{ textAlign: 'center' }}>
              <Tooltip label="Docs" withArrow><span><IconBook size={12} /></span></Tooltip>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((project) => (
            <Table.Tr key={project.id}>
              <Table.Td>
                <Text fz="sm" fw={500} lh={1.2}>{project.name}</Text>
                {project.description && (
                  <Text fz="xs" c="dimmed" lh={1.2}>{project.description}</Text>
                )}
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <IconLink href={project.github} label="GitHub" icon={<IconBrandGithub size={14} />} />
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <IconLink href={project.demo} label="Demo" icon={<IconExternalLink size={14} />} />
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <IconLink href={project.docs} label="Docs" icon={<IconBook size={14} />} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {limit && projects.length > limit && (
        <Anchor component={Link} to="/projects" fz="xs" c="dimmed" mt="xs" display="block" underline="hover">
          View all {projects.length} projects →
        </Anchor>
      )}
    </>
  )
}
