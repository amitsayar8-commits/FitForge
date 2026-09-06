package com.fitforge.app.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.FitnessCenter
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Leaderboard
import androidx.compose.material.icons.filled.Person
import androidx.compose.ui.graphics.vector.ImageVector

sealed class Screen(val route: String, val title: String = "", val icon: ImageVector? = null) {
    // Top-level Bottom Nav tabs
    object Home : Screen("home", "Home", Icons.Default.Home)
    object Workouts : Screen("workouts", "Workouts", Icons.Default.FitnessCenter)
    object Progress : Screen("progress", "Progress", Icons.Default.Leaderboard)
    object History : Screen("history", "History", Icons.Default.CalendarMonth)
    object Profile : Screen("profile", "Profile", Icons.Default.Person)

    // Flow screens
    object Onboarding : Screen("onboarding")
    object WorkoutPlayer : Screen("workout_player/{workoutId}") {
        fun createRoute(workoutId: String) = "workout_player/$workoutId"
    }
    object ExerciseDetail : Screen("exercise_detail/{exerciseId}") {
        fun createRoute(exerciseId: String) = "exercise_detail/$exerciseId"
    }
    object CustomWorkoutCreator : Screen("custom_workout_creator")
    object Settings : Screen("settings")

    companion object {
        val bottomNavItems = listOf(Home, Workouts, Progress, History, Profile)
    }
}
