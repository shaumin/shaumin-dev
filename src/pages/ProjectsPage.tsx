import { Title } from '@mantine/core'
import { ProjectsTable } from '../components/ProjectsTable'

export function ProjectsPage() {
  return (
    <>
      <Title order={2} mb="md">Projects</Title>
      <ProjectsTable />
    </>
  )
}
