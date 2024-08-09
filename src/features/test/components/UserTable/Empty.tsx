import { Box, SpaceBetween } from '@cloudscape-design/components'

export const Empty = () => (
  <Box margin={{ vertical: 'xs' }} textAlign='center' color='inherit'>
    <SpaceBetween size='m'>
      <b>データがありません</b>
    </SpaceBetween>
  </Box>
)
