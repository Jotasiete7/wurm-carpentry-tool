import { Grid3X3, Hammer, Info, Layers, RotateCcw } from 'lucide-react'
import { useCallback, useState } from 'react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import Header from './components/Header'

type TileKey = `${number}-${number}`

function CarpentryTool() {
  const { t } = useLanguage()
  const [gridSize, setGridSize] = useState(12)
  const [selectedTiles, setSelectedTiles] = useState<Set<TileKey>>(new Set())
  const [floors, setFloors] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragMode, setDragMode] = useState<'select' | 'deselect'>('select')

  const toggleTile = useCallback((row: number, col: number) => {
    const key: TileKey = `${row}-${col}`
    setSelectedTiles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }, [])

  const handleMouseDown = useCallback((row: number, col: number) => {
    const key: TileKey = `${row}-${col}`
    setIsDragging(true)
    const isSelected = selectedTiles.has(key)
    setDragMode(isSelected ? 'deselect' : 'select')
    toggleTile(row, col)
  }, [selectedTiles, toggleTile])

  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (!isDragging) return
    const key: TileKey = `${row}-${col}`
    setSelectedTiles(prev => {
      const newSet = new Set(prev)
      if (dragMode === 'select') {
        newSet.add(key)
      } else {
        newSet.delete(key)
      }
      return newSet
    })
  }, [isDragging, dragMode])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedTiles(new Set())
  }, [])

  const calculateOuterWalls = useCallback(() => {
    let outerWalls = 0

    selectedTiles.forEach(key => {
      const [row, col] = key.split('-').map(Number)

      if (!selectedTiles.has(`${row - 1}-${col}`)) outerWalls++
      if (!selectedTiles.has(`${row + 1}-${col}`)) outerWalls++
      if (!selectedTiles.has(`${row}-${col - 1}`)) outerWalls++
      if (!selectedTiles.has(`${row}-${col + 1}`)) outerWalls++
    })

    return outerWalls
  }, [selectedTiles])

  const tiles = selectedTiles.size
  const outerWalls = calculateOuterWalls()
  const carpentryRequired = tiles > 0 ? tiles + outerWalls - 5 : 0
  const carpentryPerFloor = carpentryRequired

  const getFloorRequirement = (floor: number) => {
    const baseRequirements: Record<number, number> = {
      1: 0,
      2: 21,
      3: 30,
      4: 39,
      5: 47,
      6: 55,
      7: 63,
      8: 70,
      9: 77,
      10: 83,
      11: 88,
      12: 92,
      13: 95,
      14: 97,
      15: 98,
      16: 99
    }
    return baseRequirements[floor] || 99
  }

  const maxFloorRequirement = getFloorRequirement(floors)
  const effectiveCarpentry = Math.max(carpentryRequired, maxFloorRequirement)

  return (
    <div
      className="min-h-screen bg-wurm-bg font-sans select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Hammer className="w-10 h-10 text-wurm-accent" />
            <h1 className="font-serif text-4xl font-bold text-wurm-text">
              {t('title')}
            </h1>
          </div>
          <p className="text-wurm-muted text-lg">
            {t('subtitle')}
          </p>
        </header>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Results Panel */}
          <div className="space-y-4">
            {/* Stats */}
            <div className="bg-wurm-panel border border-wurm-border rounded-xl p-5">
              <h3 className="font-serif text-lg text-wurm-text mb-4">{t('buildingStats')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-wurm-muted">{t('tiles')}</span>
                  <span className="font-mono text-xl text-wurm-text">{tiles}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-wurm-muted">{t('outerWalls')}</span>
                  <span className="font-mono text-xl text-wurm-text">{outerWalls}</span>
                </div>
                <div className="h-px bg-wurm-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-wurm-muted">{t('formula')}</span>
                  <span className="font-mono text-sm text-wurm-muted">
                    {tiles} + {outerWalls} - 5
                  </span>
                </div>
              </div>
            </div>

            {/* Floor Selector */}
            <div className="bg-wurm-panel border border-wurm-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-wurm-accent" />
                <h3 className="font-serif text-lg text-wurm-text">{t('floors')}</h3>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={floors}
                  onChange={(e) => setFloors(Number(e.target.value))}
                  className="flex-1 accent-wurm-accent"
                />
                <span className="font-mono text-2xl text-wurm-accent w-8 text-center">
                  {floors}
                </span>
              </div>
              {floors > 1 && (
                <p className="text-sm text-wurm-muted mt-2">
                  {t('floorRequires', { floor: floors, skill: maxFloorRequirement })}
                </p>
              )}
            </div>

            {/* Grid Size */}
            <div className="bg-wurm-panel border border-wurm-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Grid3X3 className="w-5 h-5 text-wurm-accent" />
                <h3 className="font-serif text-lg text-wurm-text">{t('gridSize')}</h3>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="8"
                  max="24"
                  value={gridSize}
                  onChange={(e) => setGridSize(Number(e.target.value))}
                  className="flex-1 accent-wurm-accent"
                />
                <span className="font-mono text-2xl text-wurm-accent w-12 text-center">
                  {gridSize}
                </span>
              </div>
              <p className="text-sm text-wurm-muted mt-2">
                {gridSize} x {gridSize} {t('tilesGrid')}
              </p>
            </div>

            {/* Carpentry Required */}
            <div className="bg-wurm-panel border-2 border-wurm-accent rounded-xl p-5">
              <h3 className="font-serif text-lg text-wurm-text mb-2">
                {t('carpentryRequired')}
              </h3>
              {tiles > 0 ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-wurm-muted">{t('perFloor')}</span>
                    <span className="font-mono text-3xl text-wurm-accent">
                      {carpentryPerFloor}
                    </span>
                  </div>
                  {floors > 1 && (
                    <>
                      <div className="flex justify-between items-baseline">
                        <span className="text-wurm-muted">{t('floorRequirement')}</span>
                        <span className="font-mono text-xl text-wurm-text">
                          {maxFloorRequirement}
                        </span>
                      </div>
                      <div className="h-px bg-wurm-border" />
                      <div className="flex justify-between items-baseline">
                        <span className="text-wurm-text font-medium">{t('effectiveSkill')}</span>
                        <span className="font-mono text-3xl text-wurm-accent">
                          {effectiveCarpentry}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-wurm-muted">
                  {t('selectTiles')}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-wurm-bg border border-wurm-border rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-wurm-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm text-wurm-muted space-y-2">
                  <p>
                    <strong className="text-wurm-text">{t('infoFormula')}</strong> {t('infoFormulaText')}
                  </p>
                  <p>
                    {t('infoMultiStory')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Section */}
          <div className="bg-wurm-panel border border-wurm-border rounded-xl p-6 h-fit w-fit">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-xl text-wurm-text flex items-center gap-2">
                <span>{t('buildingLayout')}</span>
                <span className="text-sm text-wurm-muted font-sans">
                  {t('clickOrDrag')}
                </span>
              </h2>
              <button
                onClick={clearSelection}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-wurm-muted hover:text-wurm-accent border border-wurm-border hover:border-wurm-accent rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {t('clear')}
              </button>
            </div>

            {/* Grid + Legend */}
            <div className="flex gap-6">
              {/* Grid */}
              <div
                className="grid gap-0.5 p-3 bg-wurm-bg rounded-lg w-fit"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                }}
              >
                {(() => {
                  const tileSize = Math.max(16, Math.floor(400 / gridSize))
                  return Array.from({ length: gridSize }, (_, row) =>
                    Array.from({ length: gridSize }, (_, col) => {
                      const key: TileKey = `${row}-${col}`
                      const isSelected = selectedTiles.has(key)

                      const hasTopNeighbor = selectedTiles.has(`${row - 1}-${col}`)
                      const hasBottomNeighbor = selectedTiles.has(`${row + 1}-${col}`)
                      const hasLeftNeighbor = selectedTiles.has(`${row}-${col - 1}`)
                      const hasRightNeighbor = selectedTiles.has(`${row}-${col + 1}`)

                      return (
                        <div
                          key={key}
                          className={`
                            cursor-pointer transition-all duration-100
                            ${isSelected
                              ? 'bg-wurm-success'
                              : 'bg-wurm-border hover:bg-wurm-accentDim'
                            }
                          `}
                          style={{
                            width: tileSize,
                            height: tileSize,
                            ...(isSelected ? {
                              borderTop: !hasTopNeighbor ? '2px solid #d4b483' : 'none',
                              borderBottom: !hasBottomNeighbor ? '2px solid #d4b483' : 'none',
                              borderLeft: !hasLeftNeighbor ? '2px solid #d4b483' : 'none',
                              borderRight: !hasRightNeighbor ? '2px solid #d4b483' : 'none',
                            } : {})
                          }}
                          onMouseDown={() => handleMouseDown(row, col)}
                          onMouseEnter={() => handleMouseEnter(row, col)}
                        />
                      )
                    })
                  )
                })()}
              </div>

              {/* Legend */}
              <div className="flex flex-col justify-center gap-3 text-sm text-wurm-muted">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-wurm-border rounded-sm" />
                  <span>{t('legendEmpty')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-wurm-success rounded-sm" />
                  <span>{t('legendSelected')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-wurm-success border-2 border-wurm-accent rounded-sm" />
                  <span>{t('legendOuterWall')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-wurm-muted text-sm space-y-1">
          <p>
            {t('footer').split('{link}')[0]}
            <a
              href="https://www.wurmpedia.com/index.php/House"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wurm-accent hover:underline"
            >
              {t('wurmpedia')}
            </a>
            {t('footer').split('{link}')[1]}
          </p>
          <p>
            {t('developedBy')}{' '}
            <a
              href="https://wurm-aguild-site.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wurm-accent hover:underline"
            >
              A Guilda
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <CarpentryTool />
    </LanguageProvider>
  )
}

export default App
