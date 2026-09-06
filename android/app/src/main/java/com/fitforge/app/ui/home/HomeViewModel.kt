package com.fitforge.app.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fitforge.app.data.model.UserPreferences
import com.fitforge.app.data.model.WorkoutPlan
import com.fitforge.app.data.repository.FitForgeRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import java.util.Calendar

data class HomeUiState(
    val userPreferences: UserPreferences = UserPreferences(),
    val greeting: String = "Good Morning 👋",
    val todayWorkout: WorkoutPlan = WorkoutPlan(
        id = "w1_chest_triceps",
        title = "Push Day: Chest & Triceps",
        subtitle = "Bench Press, Incline Dumbbells & Cable Pushdowns",
        environment = "GYM",
        category = "Push / Pull / Legs",
        difficulty = "Intermediate",
        durationMinutes = 45,
        estimatedCalories = 380,
        exerciseIdsCsv = "bench_press,incline_db_press,dips,tricep_pushdown,lateral_raise,pec_fly,overhead_extension,push_ups"
    ),
    val weeklyGoalTarget: Int = 4,
    val weeklyCompleted: Int = 3,
    val totalCaloriesBurnedWeek: Int = 1840,
    val activeTimeMinutesWeek: Int = 210,
    val hasActiveSession: Boolean = false,
    val activeWorkoutTitle: String? = null
)

class HomeViewModel(
    private val repository: FitForgeRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    init {
        determineGreeting()
        loadPreferences()
    }

    private fun determineGreeting() {
        val hour = Calendar.getInstance().get(Calendar.HOUR_OF_DAY)
        val greetingText = when (hour) {
            in 5..11 -> "Good Morning 👋"
            in 12..16 -> "Good Afternoon ⚡"
            in 17..22 -> "Good Evening 🔥"
            else -> "Late Night Grind 🌙"
        }
        _uiState.update { it.copy(greeting = greetingText) }
    }

    private fun loadPreferences() {
        viewModelScope.launch {
            repository.userPreferencesFlow.collect { prefs ->
                _uiState.update { current ->
                    current.copy(
                        userPreferences = prefs,
                        weeklyGoalTarget = prefs.workoutDaysPerWeek
                    )
                }
            }
        }
    }
}
