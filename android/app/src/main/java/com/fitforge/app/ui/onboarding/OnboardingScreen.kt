package com.fitforge.app.ui.onboarding

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.fitforge.app.ui.theme.*

@Composable
fun OnboardingScreen(
    viewModel: OnboardingViewModel,
    onOnboardingFinished: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()

    LaunchedEffect(uiState.isCompleted) {
        if (uiState.isCompleted) {
            onOnboardingFinished()
        }
    }

    Scaffold(
        containerColor = CarbonBackground,
        topBar = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                if (uiState.currentStep > 0) {
                    IconButton(onClick = { viewModel.previousStep() }) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back",
                            tint = TextPrimaryDark
                        )
                    }
                } else {
                    Spacer(modifier = Modifier.size(48.dp))
                }

                // Step indicators (6 steps)
                Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    for (i in 0..5) {
                        Box(
                            modifier = Modifier
                                .height(4.dp)
                                .width(if (i == uiState.currentStep) 24.dp else 12.dp)
                                .clip(RoundedCornerShape(2.dp))
                                .background(if (i <= uiState.currentStep) NeonLime else CarbonBorder)
                        )
                    }
                }

                TextButton(onClick = { onOnboardingFinished() }) {
                    Text("Skip", color = TextSecondaryDark, style = MaterialTheme.typography.labelSmall)
                }
            }
        },
        bottomBar = {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp)
            ) {
                Button(
                    onClick = { viewModel.nextStep() },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp),
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
                        Text(
                            text = if (uiState.currentStep == 5) "GET STARTED" else "CONTINUE",
                            style = MaterialTheme.typography.labelLarge.copy(
                                fontWeight = FontWeight.Black,
                                letterSpacing = 1.sp
                            )
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                            contentDescription = null,
                            modifier = Modifier.size(20.dp)
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 24.dp),
            contentAlignment = Alignment.TopCenter
        ) {
            AnimatedContent(
                targetState = uiState.currentStep,
                label = "OnboardingStepAnimation"
            ) { step ->
                when (step) {
                    0 -> WelcomeScreen()
                    1 -> GoalSelectionScreen(
                        selectedGoal = uiState.selectedGoal,
                        onSelectGoal = { viewModel.setGoal(it) }
                    )
                    2 -> LocationSelectionScreen(
                        selectedLocation = uiState.selectedLocation,
                        onSelectLocation = { viewModel.setLocation(it) }
                    )
                    3 -> ExperienceSelectionScreen(
                        selectedLevel = uiState.selectedLevel,
                        onSelectLevel = { viewModel.setLevel(it) }
                    )
                    4 -> DaysSelectionScreen(
                        selectedDays = uiState.selectedDays,
                        onSelectDays = { viewModel.setDays(it) }
                    )
                    5 -> DurationSelectionScreen(
                        selectedDuration = uiState.selectedDurationMinutes,
                        onSelectDuration = { viewModel.setDuration(it) }
                    )
                }
            }
        }
    }
}

@Composable
private fun WelcomeScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(top = 40.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Box(
            modifier = Modifier
                .size(96.dp)
                .clip(RoundedCornerShape(28.dp))
                .background(
                    Brush.radialGradient(
                        colors = listOf(NeonLime.copy(alpha = 0.3f), CarbonSurface)
                    )
                )
                .border(1.dp, NeonLime, RoundedCornerShape(28.dp)),
            contentAlignment = Alignment.Center
        ) {
            Text("⚡", fontSize = 44.sp)
        }

        Spacer(modifier = Modifier.height(32.dp))

        Text(
            text = "Welcome to",
            style = MaterialTheme.typography.titleMedium,
            color = TextSecondaryDark
        )
        Text(
            text = "FITFORGE",
            style = MaterialTheme.typography.displayLarge.copy(
                brush = Brush.horizontalGradient(listOf(NeonLime, EmeraldGreen))
            )
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "\"Your personalized GYM & Home workout companion.\"",
            style = MaterialTheme.typography.bodyLarge,
            color = TextPrimaryDark,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        Spacer(modifier = Modifier.height(40.dp))

        // Feature Highlights
        val highlights = listOf(
            "🏋️ Dual Training: Switch between Gym & Home setups instantly",
            "📊 Smart Progress: Track volume, streak, and PR celebrations",
            "⏱️ Built-in Rest Engine: Automatic sets and audio-haptic cues"
        )

        highlights.forEach { text ->
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp)
                    .clip(RoundedCornerShape(14.dp))
                    .background(CarbonSurface)
                    .border(1.dp, CarbonBorder, RoundedCornerShape(14.dp))
                    .padding(16.dp)
            ) {
                Text(
                    text = text,
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextPrimaryDark
                )
            }
        }
    }
}

@Composable
private fun GoalSelectionScreen(
    selectedGoal: String,
    onSelectGoal: (String) -> Unit
) {
    val goals = listOf(
        "Build Muscle" to "Gain lean mass, hypertrophy & sculpting",
        "Lose Fat" to "Burn calories, high energy metabolic conditioning",
        "Get Stronger" to "Progressive overload on core compounds",
        "Improve Fitness" to "Boost cardiovascular health and daily vitality",
        "Improve Endurance" to "High stamina, sustained aerobic resilience"
    )

    Column(modifier = Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("What is your primary goal?", style = MaterialTheme.typography.displayMedium, color = TextPrimaryDark)
        Text("We will customize your workout volume and exercise selections.", style = MaterialTheme.typography.bodyMedium, color = TextSecondaryDark, modifier = Modifier.padding(top = 8.dp, bottom = 24.dp))

        goals.forEach { (title, subtitle) ->
            OptionCard(
                title = title,
                subtitle = subtitle,
                isSelected = selectedGoal == title,
                onClick = { onSelectGoal(title) }
            )
        }
    }
}

@Composable
private fun LocationSelectionScreen(
    selectedLocation: String,
    onSelectLocation: (String) -> Unit
) {
    val locations = listOf(
        Triple("GYM", "Full barbell, dumbbell & machine access", "🏋️"),
        Triple("HOME", "Bodyweight, dumbbells & resistance bands", "🏠"),
        Triple("BOTH", "Dynamic routines adaptable for any setting", "⚡")
    )

    Column(modifier = Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("Where do you workout?", style = MaterialTheme.typography.displayMedium, color = TextPrimaryDark)
        Text("Select your primary environment or train across both.", style = MaterialTheme.typography.bodyMedium, color = TextSecondaryDark, modifier = Modifier.padding(top = 8.dp, bottom = 24.dp))

        locations.forEach { (loc, desc, emoji) ->
            OptionCard(
                title = "$emoji  $loc",
                subtitle = desc,
                isSelected = selectedLocation == loc,
                onClick = { onSelectLocation(loc) }
            )
        }
    }
}

@Composable
private fun ExperienceSelectionScreen(
    selectedLevel: String,
    onSelectLevel: (String) -> Unit
) {
    val levels = listOf(
        Triple("Beginner", "< 1 year of consistent lifting. Mastering movement patterns.", "🌱"),
        Triple("Intermediate", "1–3 years experience. Solid form and progressive overload.", "🔥"),
        Triple("Advanced", "3+ years training. High work capacity and custom periodization.", "⚡")
    )

    Column(modifier = Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("What's your experience level?", style = MaterialTheme.typography.displayMedium, color = TextPrimaryDark)
        Text("Tailors set schemes, volume, and exercise complexity.", style = MaterialTheme.typography.bodyMedium, color = TextSecondaryDark, modifier = Modifier.padding(top = 8.dp, bottom = 24.dp))

        levels.forEach { (level, desc, icon) ->
            OptionCard(
                title = "$icon  $level",
                subtitle = desc,
                isSelected = selectedLevel == level,
                onClick = { onSelectLevel(level) }
            )
        }
    }
}

@Composable
private fun DaysSelectionScreen(
    selectedDays: Int,
    onSelectDays: (Int) -> Unit
) {
    val daysList = listOf(
        2 to "Full Body Split (2 days / week)",
        3 to "Classic Push / Pull / Legs or Full Body (3 days / week)",
        4 to "Upper / Lower Split (4 days / week)",
        5 to "Bro Split or PPL + Upper/Lower (5 days / week)",
        6 to "Dedicated Push / Pull / Legs 6-Day (6 days / week)"
    )

    Column(modifier = Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("How many days can you workout?", style = MaterialTheme.typography.displayMedium, color = TextPrimaryDark)
        Text("Commitment balance prevents burnout and maximizes recovery.", style = MaterialTheme.typography.bodyMedium, color = TextSecondaryDark, modifier = Modifier.padding(top = 8.dp, bottom = 24.dp))

        daysList.forEach { (days, desc) ->
            OptionCard(
                title = "$days Days per Week",
                subtitle = desc,
                isSelected = selectedDays == days,
                onClick = { onSelectDays(days) }
            )
        }
    }
}

@Composable
private fun DurationSelectionScreen(
    selectedDuration: Int,
    onSelectDuration: (Int) -> Unit
) {
    val durations = listOf(
        15 to "Quick HIIT & Core Blast (15 mins)",
        30 to "Express Routine (30 mins)",
        45 to "Standard Comprehensive Session (45 mins)",
        60 to "Hypertrophy Volume Session (60 mins)",
        90 to "Advanced Heavy Lifting & Accessories (90 mins)"
    )

    Column(modifier = Modifier.fillMaxWidth().padding(top = 20.dp)) {
        Text("How long is each workout?", style = MaterialTheme.typography.displayMedium, color = TextPrimaryDark)
        Text("Every routine will fit precisely within your schedule.", style = MaterialTheme.typography.bodyMedium, color = TextSecondaryDark, modifier = Modifier.padding(top = 8.dp, bottom = 24.dp))

        durations.forEach { (duration, desc) ->
            OptionCard(
                title = "$duration Minutes",
                subtitle = desc,
                isSelected = selectedDuration == duration,
                onClick = { onSelectDuration(duration) }
            )
        }
    }
}

@Composable
private fun OptionCard(
    title: String,
    subtitle: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    val borderColor = if (isSelected) NeonLime else CarbonBorder
    val bgColor = if (isSelected) CarbonSurfaceVariant else CarbonSurface

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp)
            .clip(RoundedCornerShape(16.dp))
            .background(bgColor)
            .border(if (isSelected) 2.dp else 1.dp, borderColor, RoundedCornerShape(16.dp))
            .clickable { onClick() }
            .padding(18.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    color = if (isSelected) NeonLime else TextPrimaryDark,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondaryDark
                )
            }
            if (isSelected) {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = "Selected",
                    tint = NeonLime,
                    modifier = Modifier.size(24.dp)
                )
            }
        }
    }
}
