import * as fs from 'fs'

export function fetchStaticDataset<T>(filename: string): T {
  const staticContent = fs.readFileSync(filename, { encoding: 'utf8' })
  return JSON.parse(staticContent)
}
