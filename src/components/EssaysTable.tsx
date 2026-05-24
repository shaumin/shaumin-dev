import { Anchor, Table, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { useEssayFeed } from '../hooks/useEssayFeed'

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

interface EssaysTableProps {
  limit?: number
}

export function EssaysTable({ limit }: EssaysTableProps) {
  const { essays, loading } = useEssayFeed()
  const items = limit ? essays.slice(0, limit) : essays

  if (loading && items.length === 0) {
    return <Text fz="sm" c="dimmed">Loading essays…</Text>
  }

  return (
    <>
      <Table withRowBorders highlightOnHover verticalSpacing={4} fz="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th w={110} style={{ textAlign: 'right' }}>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((essay) => (
            <Table.Tr key={essay.id}>
              <Table.Td>
                <Anchor href={essay.url} fz="sm" fw={500} underline="hover">
                  {essay.title}
                </Anchor>
              </Table.Td>
              <Table.Td style={{ textAlign: 'right' }}>
                <Text fz="xs" c="dimmed">{fmt(essay.date)}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {limit && essays.length > limit && (
        <Anchor component={Link} to="/essays" fz="xs" c="dimmed" mt="xs" display="block" underline="hover">
          View all {essays.length} essays →
        </Anchor>
      )}
    </>
  )
}
