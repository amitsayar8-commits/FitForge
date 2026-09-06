package com.fitforge.app.data.model

data class UserPreferences(
    val isOnboardingCompleted: Boolean = false,
    val primaryGoal: String = "Build Muscle", // "Build Muscle", "Lose Fat", "Get Stronger", "Improve Fitness", "Improve Endurance"
    val workoutLocation: String = "GYM",      // "GYM", "HOME", "BOTH"
    val experienceLevel: String = "Intermediate", // "Beginner", "Intermediate", "Advanced"
    val workoutDaysPerWeek: Int = 4,          // 2, 3, 4, 5, 6
    val workoutDurationMinutes: Int = 45,     // 15, 30, 45, 60, 90
    val userName: String = "Alex Forge",
    val userAge: Int = 26,
    val userHeightCm: Float = 178f,
    val currentWeightKg: Float = 76.5f,
    val targetWeightKg: Float = 80.0f,
    val unitSystem: String = "metric",        // "metric" (kg) or "imperial" (lb)
    val soundEnabled: Boolean = true,
    val vibrationEnabled: Boolean = true,
    val defaultRestSeconds: Int = 90,
    val currentStreak: Int = 4,
    val bestStreak: Int = 12
)
