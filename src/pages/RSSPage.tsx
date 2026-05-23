import { Title } from '@mantine/core'
import { RSSTable } from '../components/RSSTable'

export function RSSPage() {
  return (
    <>
      <Title order={2} mb="md">RSS</Title>
      <RSSTable />
    </>
  )
}
