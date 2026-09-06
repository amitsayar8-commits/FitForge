package com.fitforge.app.navigation

import androidx.compose.animation.animateColorAsState
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.currentBackStackEntryAsState
import com.fitforge.app.ui.theme.CarbonBorder
import com.fitforge.app.ui.theme.CarbonSurface
import com.fitforge.app.ui.theme.NeonLime
import com.fitforge.app.ui.theme.TextSecondaryDark

@Composable
fun FitForgeBottomNavBar(
    navController: NavController,
    modifier: Modifier = Modifier
) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    NavigationBar(
        modifier = modifier,
        containerColor = CarbonSurface,
        tonalElevation = 8.dp
    ) {
        Screen.bottomNavItems.forEach { screen ->
            val selected = currentRoute == screen.route
            val iconTint by animateColorAsState(
                targetValue = if (selected) NeonLime else TextSecondaryDark,
                label = "navIconTint"
            )

            NavigationBarItem(
                selected = selected,
                onClick = {
                    if (currentRoute != screen.route) {
                        navController.navigate(screen.route) {
                            popUpTo(navController.graph.findStartDestination().id) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                },
                icon = {
                    screen.icon?.let {
                        Icon(
                            imageVector = it,
                            contentDescription = screen.title,
                            tint = iconTint
                        )
                    }
                },
                label = {
                    Text(
                        text = screen.title,
                        color = if (selected) NeonLime else TextSecondaryDark,
                        style = MaterialTheme.typography.labelSmall
                    )
                },
                colors = NavigationBarItemDefaults.colors(
                    indicatorColor = CarbonBorder
                )
            )
        }
    }
}
