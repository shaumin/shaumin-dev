import { AppShell, Anchor, Container, Group } from '@mantine/core'
import { Link, Outlet } from '@tanstack/react-router'

const baseNavStyle = {
  textDecoration: 'none',
  color: 'var(--mantine-color-dimmed)',
  fontSize: 'var(--mantine-font-size-sm)',
}
const activeNavStyle = {
  textDecoration: 'none',
  color: 'var(--mantine-color-text)',
  fontWeight: 500,
  fontSize: 'var(--mantine-font-size-sm)',
}

function TopNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} style={baseNavStyle} activeProps={{ style: activeNavStyle }}>
      {children}
    </Link>
  )
}

export function AppLayout() {
  return (
    <AppShell header={{ height: 56 }} padding={0}>
      <AppShell.Header style={{ borderBottom: '1px solid var(--mantine-color-default-border)', background: 'var(--mantine-color-body)' }}>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Anchor component={Link} to="/" underline="never" fw={600} c="inherit" style={{ letterSpacing: '-0.02em' }}>
              shaumin
            </Anchor>
            <Group gap="lg">
              <TopNavLink to="/">Home</TopNavLink>
              <TopNavLink to="/projects">Projects</TopNavLink>
              <TopNavLink to="/essays">Essays</TopNavLink>
              <TopNavLink to="/rss">RSS</TopNavLink>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="lg" py="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
