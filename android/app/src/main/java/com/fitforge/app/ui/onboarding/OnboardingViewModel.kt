package com.fitforge.app.ui.onboarding

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fitforge.app.data.repository.FitForgeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class OnboardingUiState(
    val currentStep: Int = 0, // 0 to 5 (6 screens)
    val selectedGoal: String = "Build Muscle",
    val selectedLocation: String = "GYM",
    val selectedLevel: String = "Intermediate",
    val selectedDays: Int = 4,
    val selectedDurationMinutes: Int = 45,
    val isCompleted: Boolean = false
)

class OnboardingViewModel(
    private val repository: FitForgeRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(OnboardingUiState())
    val uiState: StateFlow<OnboardingUiState> = _uiState.asStateFlow()

    fun setGoal(goal: String) {
        _uiState.update { it.copy(selectedGoal = goal) }
    }

    fun setLocation(loc: String) {
        _uiState.update { it.copy(selectedLocation = loc) }
    }

    fun setLevel(level: String) {
        _uiState.update { it.copy(selectedLevel = level) }
    }

    fun setDays(days: Int) {
        _uiState.update { it.copy(selectedDays = days) }
    }

    fun setDuration(minutes: Int) {
        _uiState.update { it.copy(selectedDurationMinutes = minutes) }
    }

    fun nextStep() {
        if (_uiState.value.currentStep < 5) {
            _uiState.update { it.copy(currentStep = it.currentStep + 1) }
        } else {
            completeOnboarding()
        }
    }

    fun previousStep() {
        if (_uiState.value.currentStep > 0) {
            _uiState.update { it.copy(currentStep = it.currentStep - 1) }
        }
    }

    private fun completeOnboarding() {
        viewModelScope.launch {
            val state = _uiState.value
            repository.saveOnboardingPreferences(
                goal = state.selectedGoal,
                location = state.selectedLocation,
                level = state.selectedLevel,
                days = state.selectedDays,
                duration = state.selectedDurationMinutes
            )
            _uiState.update { it.copy(isCompleted = true) }
        }
    }
}
