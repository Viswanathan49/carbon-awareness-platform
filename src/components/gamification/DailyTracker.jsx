import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { translations } from '../../locales/translations'

const HABITS = [
  { id: 'cycle', nameKey: 'cycle', icon: '🚲', offset: 2.0, points: 20 },
  { id: 'cup', nameKey: 'cup', icon: '☕', offset: 0.5, points: 5 },
  { id: 'meal', nameKey: 'meal', icon: '🌱', offset: 1.5, points: 15 },
  { id: 'unplug', nameKey: 'unplug', icon: '🔌', offset: 0.2, points: 2 },
  { id: 'transit', nameKey: 'trackerTransit', icon: '🚌', offset: 1.2, points: 12 },
  { id: 'plastic', nameKey: 'plastic', icon: '🧴', offset: 0.3, points: 3 },
]

export default function DailyTracker() {
  const { language, addCarbonScore, addPointsEarned } = useStore()
  const [completedHabits, setCompletedHabits] = useState([])
  const t = translations[language]

  // Calculate local stats
  const totalOffset = HABITS
    .filter(h => completedHabits.includes(h.id))
    .reduce((sum, h) => sum + h.offset, 0)
    
  const totalPoints = HABITS
    .filter(h => completedHabits.includes(h.id))
    .reduce((sum, h) => sum + h.points, 0)

  const handleToggleHabit = (habit) => {
    const isCompleted = completedHabits.includes(habit.id)
    if (isCompleted) {
      // Uncheck: remove from state, add back carbon emissions, subtract points
      setCompletedHabits(prev => prev.filter(id => id !== habit.id))
      addCarbonScore(habit.offset)
      addPointsEarned(-habit.points)
    } else {
      // Check: add to state, subtract carbon emissions, add points
      setCompletedHabits(prev => [...prev, habit.id])
      addCarbonScore(-habit.offset)
      addPointsEarned(habit.points)
    }
  }

  return (
    <section className="tracker-section" aria-label="Daily Eco-Habits Tracker">
      <div className="tracker-wrapper">
        <header className="tracker-header">
          <h1 className="tracker-title">{t.trackerTitle}</h1>
          <p className="tracker-subtitle">{t.trackerSubtitle}</p>
        </header>

        {/* Local Summary Badges */}
        <div className="tracker-stats-row">
          <div className="tracker-stat-box glass">
            <span className="stat-value text-green">-{totalOffset.toFixed(1)} kg</span>
            <span className="stat-label">{t.impactLabel}</span>
          </div>
          <div className="tracker-stat-box glass">
            <span className="stat-value text-blue">+{totalPoints}</span>
            <span className="stat-label">{t.trackerPointsLabel}</span>
          </div>
        </div>

        {/* Habits Checklist Grid */}
        <h2 className="tracker-grid-title">{t.checklistTitle}</h2>
        <div className="tracker-grid" role="group" aria-label={t.checklistTitle}>
          {HABITS.map((habit) => {
            const isDone = completedHabits.includes(habit.id)
            const name = t[habit.nameKey]
            const ariaLabelText = t.actionCardAria
              .replace('{name}', name)
              .replace('{offset}', habit.offset)
              .replace('{points}', habit.points)

            return (
              <div
                key={habit.id}
                className={`tracker-card ${isDone ? 'active' : ''}`}
                onClick={() => handleToggleHabit(habit)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleToggleHabit(habit); e.preventDefault(); } }}
                tabIndex={0}
                role="checkbox"
                aria-checked={isDone}
                aria-label={ariaLabelText}
              >
                <div className="tracker-card-top">
                  <span className="tracker-card-icon" aria-hidden="true">{habit.icon}</span>
                  {isDone && <span className="tracker-card-checkmark" aria-hidden="true">✔</span>}
                </div>
                <div className="tracker-card-body">
                  <h3 className="tracker-card-name">{name}</h3>
                  <div className="tracker-card-stats">
                    <span className="tracker-card-offset">-{habit.offset} kg CO₂</span>
                    <span className="tracker-card-points">+{habit.points} pts</span>
                  </div>
                </div>
                <div className="tracker-card-footer">
                  <span className="tracker-card-status">
                    {isDone ? t.statusActive : t.statusInactive}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
