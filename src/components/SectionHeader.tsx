import { Anchor, Group, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'

interface SectionHeaderProps {
  title: string
  to: string
  count?: number
}

export function SectionHeader({ title, to, count }: SectionHeaderProps) {
  return (
    <Group justify="space-between" mb="xs" align="baseline">
      <Text fw={600} fz="md" style={{ letterSpacing: '-0.02em' }}>
        {title}
        {count !== undefined && (
          <Text span c="dimmed" fz="sm" fw={400} ml={6}>{count}</Text>
        )}
      </Text>
      <Anchor component={Link} to={to} fz="xs" c="dimmed" underline="hover">
        More →
      </Anchor>
    </Group>
  )
}
