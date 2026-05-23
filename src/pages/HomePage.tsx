import { Divider, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { EssaysTable } from '../components/EssaysTable'
import { ProjectsTable } from '../components/ProjectsTable'
import { RSSTable } from '../components/RSSTable'
import { SectionHeader } from '../components/SectionHeader'
import { essays } from '../data/essays'
import { projects } from '../data/projects'
import { rssItems } from '../data/rss'

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
          <SectionHeader title="Projects" to="/projects" count={projects.length} />
          <ProjectsTable limit={PREVIEW} />
        </div>
        <div>
          <SectionHeader title="Essays" to="/essays" count={essays.length} />
          <EssaysTable limit={PREVIEW} />
        </div>
      </SimpleGrid>

      <Divider />

      <div>
        <SectionHeader title="RSS" to="/rss" count={rssItems.length} />
        <RSSTable limit={PREVIEW} />
      </div>
    </Stack>
  )
}
