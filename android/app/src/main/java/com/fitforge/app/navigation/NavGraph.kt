package com.fitforge.app.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.compose.*
import com.fitforge.app.FitForgeApp
import com.fitforge.app.ui.home.HomeScreen
import com.fitforge.app.ui.home.HomeViewModel
import com.fitforge.app.ui.onboarding.OnboardingScreen
import com.fitforge.app.ui.onboarding.OnboardingViewModel

@Composable
fun FitForgeNavGraph(
    navController: NavHostController,
    startDestination: String = Screen.Onboarding.route
) {
    val repository = FitForgeApp.instance.repository
    val userPrefs by repository.userPreferencesFlow.collectAsState(initial = null)

    val effectiveStart = remember(userPrefs) {
        if (userPrefs?.isOnboardingCompleted == true) {
            Screen.Home.route
        } else {
            Screen.Onboarding.route
        }
    }

    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route
    val showBottomBar = currentRoute in Screen.bottomNavItems.map { it.route }

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                FitForgeBottomNavBar(navController = navController)
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = effectiveStart,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Onboarding.route) {
                val onboardingViewModel = remember { OnboardingViewModel(repository) }
                OnboardingScreen(
                    viewModel = onboardingViewModel,
                    onOnboardingFinished = {
                        navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Onboarding.route) { inclusive = true }
                        }
                    }
                )
            }

            composable(Screen.Home.route) {
                val homeViewModel = remember { HomeViewModel(repository) }
                HomeScreen(
                    viewModel = homeViewModel,
                    onStartWorkout = { workoutId ->
                        navController.navigate(Screen.WorkoutPlayer.createRoute(workoutId))
                    },
                    onContinueWorkout = {
                        navController.navigate(Screen.WorkoutPlayer.createRoute("w1_chest_triceps"))
                    },
                    onNavigateToWorkouts = {
                        navController.navigate(Screen.Workouts.route)
                    },
                    onNavigateToProgress = {
                        navController.navigate(Screen.Progress.route)
                    },
                    onNavigateToProfile = {
                        navController.navigate(Screen.Profile.route)
                    }
                )
            }

            composable(Screen.Workouts.route) {
                // Workouts screen destination (Phase 2)
            }

            composable(Screen.Progress.route) {
                // Progress tracking screen destination (Phase 2)
            }

            composable(Screen.History.route) {
                // History screen destination (Phase 2)
            }

            composable(Screen.Profile.route) {
                // Profile screen destination (Phase 2)
            }

            composable(Screen.WorkoutPlayer.route) { backStackEntry ->
                val workoutId = backStackEntry.arguments?.getString("workoutId") ?: ""
                // Workout player screen destination (Phase 2)
            }
        }
    }
}
