import { Divider, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { EssaysTable } from '../components/EssaysTable'
import { ProjectsTable } from '../components/ProjectsTable'
import { RSSTable } from '../components/RSSTable'
import { SectionHeader } from '../components/SectionHeader'

const PREVIEW = 4

export function HomePage() {
  return (
    <Stack gap="xl">
      <div>
        <Title order={1} mb={4}>shaumin</Title>
        <Text c="dimmed" fz="sm">Developer, writer, builder.</Text>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        <div>
          <SectionHeader title="Projects" to="/projects" />
          <ProjectsTable limit={PREVIEW} />
        </div>
        <div>
          <SectionHeader title="Essays" to="/essays" />
          <EssaysTable limit={PREVIEW} />
        </div>
      </SimpleGrid>

      <Divider />

      <div>
        <SectionHeader title="RSS" to="/rss" />
        <RSSTable limit={PREVIEW} />
      </div>
    </Stack>
  )
}
