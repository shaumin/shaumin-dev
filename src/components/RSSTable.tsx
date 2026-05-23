import { Anchor, SegmentedControl, Table, Text, Tooltip } from '@mantine/core'
import { IconPin } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { rssItems } from '../data/rss'

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

type SortMode = 'latest' | 'pinned'

interface RSSTableProps {
  limit?: number
  showSort?: boolean
}

export function RSSTable({ limit, showSort = true }: RSSTableProps) {
  const [sortMode, setSortMode] = useState<SortMode>('latest')

  const sorted = [...rssItems].sort((a, b) => {
    if (sortMode === 'pinned') {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const items = limit ? sorted.slice(0, limit) : sorted

  return (
    <>
      {showSort && (
        <SegmentedControl
          size="xs"
          mb="xs"
          value={sortMode}
          onChange={(v) => setSortMode(v as SortMode)}
          data={[
            { label: 'Latest', value: 'latest' },
            { label: 'Pinned first', value: 'pinned' },
          ]}
        />
      )}
      <Table withRowBorders highlightOnHover verticalSpacing={4} fz="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={20}></Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th w={130}>Source</Table.Th>
            <Table.Th w={110} style={{ textAlign: 'right' }}>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                {item.pinned && (
                  <Tooltip label="Pinned" withArrow>
                    <IconPin size={12} style={{ color: 'var(--mantine-color-dimmed)', display: 'block' }} />
                  </Tooltip>
                )}
              </Table.Td>
              <Table.Td>
                <Anchor href={item.url} fz="sm" fw={500} underline="hover">
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
      {limit && rssItems.length > limit && (
        <Anchor component={Link} to="/rss" fz="xs" c="dimmed" mt="xs" display="block" underline="hover">
          View all {rssItems.length} items →
        </Anchor>
      )}
    </>
  )
}
