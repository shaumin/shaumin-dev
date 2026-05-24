import { Anchor, Skeleton, Table, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { useRSSFeed } from '../hooks/useRSSFeed'

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

interface RSSTableProps {
  limit?: number
}

export function RSSTable({ limit }: RSSTableProps) {
  const { items, loading } = useRSSFeed()
  const visible = limit ? items.slice(0, limit) : items

  if (loading && visible.length === 0) {
    return (
      <Table withRowBorders verticalSpacing={4} fz="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th w={130}>Source</Table.Th>
            <Table.Th w={110} style={{ textAlign: 'right' }}>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Array.from({ length: limit ?? 4 }).map((_, i) => (
            <Table.Tr key={i}>
              <Table.Td><Skeleton height={14} width="70%" radius="sm" /></Table.Td>
              <Table.Td><Skeleton height={14} width="80%" radius="sm" /></Table.Td>
              <Table.Td><Skeleton height={14} width="60%" radius="sm" /></Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    )
  }

  if (!loading && visible.length === 0) {
    return <Text fz="sm" c="dimmed">No items found.</Text>
  }

  return (
    <>
      <Table withRowBorders highlightOnHover verticalSpacing={4} fz="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th w={130}>Source</Table.Th>
            <Table.Th w={110} style={{ textAlign: 'right' }}>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {visible.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                <Anchor href={item.url} target="_blank" rel="noopener noreferrer" fz="sm" fw={500} underline="hover">
                  {item.title}
                </Anchor>
              </Table.Td>
              <Table.Td>
                <Text fz="xs" c="dimmed">{item.source}</Text>
              </Table.Td>
              <Table.Td style={{ textAlign: 'right' }}>
                <Text fz="xs" c="dimmed">{fmt(item.date)}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {limit && items.length > limit && (
        <Anchor component={Link} to="/rss" fz="xs" c="dimmed" mt="xs" display="block" underline="hover">
          View all {items.length} items →
        </Anchor>
      )}
    </>
  )
}
