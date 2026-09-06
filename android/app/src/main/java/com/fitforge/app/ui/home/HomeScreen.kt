package com.fitforge.app.ui.home

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fitforge.app.ui.theme.*

@Composable
fun HomeScreen(
    viewModel: HomeViewModel,
    onStartWorkout: (String) -> Unit,
    onContinueWorkout: () -> Unit,
    onNavigateToWorkouts: () -> Unit,
    onNavigateToProgress: () -> Unit,
    onNavigateToProfile: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val prefs = uiState.userPreferences

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(CarbonBackground)
            .padding(horizontal = 20.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 96.dp)
    ) {
        // 1. Header with Greeting & Profile
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 12.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Hello, ${prefs.userName.substringBefore(" ")} 👋",
                        style = MaterialTheme.typography.titleMedium,
                        color = TextSecondaryDark
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(
                        text = "Ready to crush your goals?",
                        style = MaterialTheme.typography.headlineMedium,
                        color = TextPrimaryDark,
                        fontWeight = FontWeight.ExtraBold
                    )
                }

                // Profile Avatar / Badge
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .clip(CircleShape)
                        .background(CarbonSurfaceVariant)
                        .border(1.5.dp, NeonLime, CircleShape)
                        .clickable { onNavigateToProfile() },
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = prefs.userName.take(2).uppercase(),
                        color = NeonLime,
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp
                    )
                }
            }
        }

        // 2. Weekly Progress Overview Card
        item {
            Spacer(modifier = Modifier.height(16.dp))
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = CarbonSurface),
                border = androidx.compose.foundation.BorderStroke(1.dp, CarbonBorder)
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            text = "Weekly Progress",
                            style = MaterialTheme.typography.titleMedium,
                            color = TextPrimaryDark,
                            fontWeight = FontWeight.Bold
                        )
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "🔥 ${prefs.currentStreak} Day Streak",
                                color = CoralFlame,
                                style = MaterialTheme.typography.labelLarge
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        // Circular Progress Indicator Ring
                        Box(
                            modifier = Modifier
                                .size(88.dp)
                                .clip(CircleShape)
                                .background(CarbonSurfaceVariant),
                            contentAlignment = Alignment.Center
                        ) {
                            CircularProgressIndicator(
                                progress = { (uiState.weeklyCompleted.toFloat() / uiState.weeklyGoalTarget.toFloat()).coerceIn(0f, 1f) },
                                modifier = Modifier.fillMaxSize(),
                                color = NeonLime,
                                strokeWidth = 8.dp,
                                trackColor = CarbonBorder
                            )
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text(
                                    text = "${((uiState.weeklyCompleted.toFloat() / uiState.weeklyGoalTarget) * 100).toInt()}%",
                                    style = MaterialTheme.typography.titleLarge,
                                    color = TextPrimaryDark,
                                    fontWeight = FontWeight.Black
                                )
                                Text(
                                    text = "${uiState.weeklyCompleted}/${uiState.weeklyGoalTarget}",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = TextSecondaryDark
                                )
                            }
                        }

                        // Stat Badges
                        Column(
                            modifier = Modifier.weight(1f).padding(start = 20.dp),
                            verticalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(CarbonSurfaceVariant)
                                    .padding(horizontal = 12.dp, vertical = 8.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text("🔥", fontSize = 16.sp)
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text("Calories (Est.)", style = MaterialTheme.typography.bodyMedium, color = TextSecondaryDark)
                                }
                                Text(
                                    "${uiState.totalCaloriesBurnedWeek} kcal",
                                    style = MaterialTheme.typography.titleMedium,
                                    color = TextPrimaryDark,
                                    fontWeight = FontWeight.Bold
                                )
                            }

                            Row(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(CarbonSurfaceVariant)
                                    .padding(horizontal = 12.dp, vertical = 8.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text("⏱️", fontSize = 16.sp)
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text("Active Time", style = MaterialTheme.typography.bodyMedium, color = TextSecondaryDark)
                                }
                                Text(
                                    "${uiState.activeTimeMinutesWeek / 60}h ${uiState.activeTimeMinutesWeek % 60}m",
                                    style = MaterialTheme.typography.titleMedium,
                                    color = TextPrimaryDark,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }
                }
            }
        }

        // 3. Quick Actions
        item {
            Spacer(modifier = Modifier.height(20.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                QuickActionItem(title = "Exercises", icon = "🏋️", onClick = { onNavigateToWorkouts() })
                QuickActionItem(title = "Progress", icon = "📊", onClick = { onNavigateToProgress() })
                QuickActionItem(title = "Body Stats", icon = "⚖️", onClick = { onNavigateToProgress() })
                QuickActionItem(title = "Settings", icon = "⚙️", onClick = { onNavigateToProfile() })
            }
        }

        // 4. Continue Workout (if active)
        if (uiState.hasActiveSession) {
            item {
                Spacer(modifier = Modifier.height(16.dp))
                Card(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .border(1.dp, CoralFlame, RoundedCornerShape(16.dp))
                        .clickable { onContinueWorkout() },
                    colors = CardDefaults.cardColors(containerColor = CarbonSurfaceVariant)
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Column {
                            Text("ACTIVE WORKOUT IN PROGRESS", style = MaterialTheme.typography.labelSmall, color = CoralFlame)
                            Text(uiState.activeWorkoutTitle ?: "Workout Session", style = MaterialTheme.typography.titleMedium, color = TextPrimaryDark)
                        }
                        Button(
                            onClick = onContinueWorkout,
                            colors = ButtonDefaults.buttonColors(containerColor = CoralFlame)
                        ) {
                            Text("Resume", color = Color.White)
                        }
                    }
                }
            }
        }

        // 5. Today's Workout Hero Card
        item {
            Spacer(modifier = Modifier.height(20.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Today's Workout",
                    style = MaterialTheme.typography.titleLarge,
                    color = TextPrimaryDark
                )
                Text(
                    text = "See all",
                    style = MaterialTheme.typography.labelLarge,
                    color = NeonLime,
                    modifier = Modifier.clickable { onNavigateToWorkouts() }
                )
            }

            Spacer(modifier = Modifier.height(12.dp))

            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = CarbonSurface),
                border = androidx.compose.foundation.BorderStroke(1.5.dp, CarbonBorder)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    // Category & Environment Badge
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(NeonLime.copy(alpha = 0.15f))
                                    .padding(horizontal = 8.dp, vertical = 4.dp)
                            ) {
                                Text(
                                    text = "🏋️ ${uiState.todayWorkout.environment}",
                                    color = NeonLime,
                                    style = MaterialTheme.typography.labelSmall,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                            Box(
                                modifier = Modifier
                                    .clip(RoundedCornerShape(8.dp))
                                    .background(CarbonSurfaceVariant)
                                    .padding(horizontal = 8.dp, vertical = 4.dp)
                            ) {
                                Text(
                                    text = uiState.todayWorkout.difficulty,
                                    color = TextSecondaryDark,
                                    style = MaterialTheme.typography.labelSmall
                                )
                            }
                        }

                        Text(
                            text = "~${uiState.todayWorkout.estimatedCalories} kcal (Est.)",
                            color = AmberGlow,
                            style = MaterialTheme.typography.labelSmall,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Text(
                        text = uiState.todayWorkout.title,
                        style = MaterialTheme.typography.headlineMedium,
                        color = TextPrimaryDark,
                        fontWeight = FontWeight.ExtraBold
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = uiState.todayWorkout.subtitle,
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextSecondaryDark
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // Workout specs row
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        WorkoutSpecChip(icon = "⏱️", label = "${uiState.todayWorkout.durationMinutes} min")
                        WorkoutSpecChip(icon = "📋", label = "8 Exercises")
                        WorkoutSpecChip(icon = "⚡", label = "Moderate")
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    // Start Workout CTA
                    Button(
                        onClick = { onStartWorkout(uiState.todayWorkout.id) },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(54.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = NeonLime,
                            contentColor = CarbonBackground
                        ),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.Center
                        ) {
                            Icon(
                                imageVector = Icons.Default.PlayArrow,
                                contentDescription = null,
                                modifier = Modifier.size(24.dp)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "START WORKOUT",
                                style = MaterialTheme.typography.labelLarge.copy(
                                    fontWeight = FontWeight.Black,
                                    letterSpacing = 1.sp
                                )
                            )
                        }
                    }
                }
            }
        }

        // 6. Safety Disclaimer Section (Section 22 requirement)
        item {
            Spacer(modifier = Modifier.height(24.dp))
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(CarbonSurfaceVariant.copy(alpha = 0.5f))
                    .border(1.dp, CarbonBorder, RoundedCornerShape(12.dp))
                    .padding(14.dp)
            ) {
                Text(
                    text = "⚕️ This app provides general fitness information and is not a substitute for professional medical advice. Stop exercising if you experience pain or unusual symptoms and consult an appropriate professional when needed.",
                    style = MaterialTheme.typography.labelSmall,
                    color = TextTertiaryDark,
                    lineHeight = 16.sp
                )
            }
        }
    }
}

@Composable
private fun QuickActionItem(
    title: String,
    icon: String,
    onClick: () -> Unit
) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .clip(RoundedCornerShape(14.dp))
            .clickable { onClick() }
            .padding(8.dp)
    ) {
        Box(
            modifier = Modifier
                .size(52.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(CarbonSurface)
                .border(1.dp, CarbonBorder, RoundedCornerShape(16.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text(icon, fontSize = 22.sp)
        }
        Spacer(modifier = Modifier.height(6.dp))
        Text(
            text = title,
            style = MaterialTheme.typography.labelSmall,
            color = TextSecondaryDark
        )
    }
}

@Composable
private fun WorkoutSpecChip(icon: String, label: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clip(RoundedCornerShape(8.dp))
            .background(CarbonSurfaceVariant)
            .padding(horizontal = 10.dp, vertical = 6.dp)
    ) {
        Text(icon, fontSize = 13.sp)
        Spacer(modifier = Modifier.width(6.dp))
        Text(
            text = label,
            style = MaterialTheme.typography.labelSmall,
            color = TextPrimaryDark,
            fontWeight = FontWeight.SemiBold
        )
    }
}
