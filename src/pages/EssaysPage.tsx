import { Title } from '@mantine/core'
import { EssaysTable } from '../components/EssaysTable'

export function EssaysPage() {
  return (
    <>
      <Title order={2} mb="md">Essays</Title>
      <EssaysTable />
    </>
  )
}
