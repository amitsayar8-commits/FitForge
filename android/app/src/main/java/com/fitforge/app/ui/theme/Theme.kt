package com.fitforge.app.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = NeonLime,
    onPrimary = CarbonBackground,
    primaryContainer = CarbonSurfaceVariant,
    onPrimaryContainer = NeonLime,
    secondary = EmeraldGreen,
    onSecondary = CarbonBackground,
    tertiary = CoralFlame,
    background = CarbonBackground,
    onBackground = TextPrimaryDark,
    surface = CarbonSurface,
    onSurface = TextPrimaryDark,
    surfaceVariant = CarbonSurfaceVariant,
    onSurfaceVariant = TextSecondaryDark,
    outline = CarbonBorder
)

private val LightColorScheme = lightColorScheme(
    primary = NeonLimeDark,
    onPrimary = CarbonBackground,
    primaryContainer = LightSurfaceVariant,
    onPrimaryContainer = TextPrimaryLight,
    secondary = EmeraldGreen,
    onSecondary = LightSurface,
    tertiary = CoralFlame,
    background = LightBackground,
    onBackground = TextPrimaryLight,
    surface = LightSurface,
    onSurface = TextPrimaryLight,
    surfaceVariant = LightSurfaceVariant,
    onSurfaceVariant = TextSecondaryLight,
    outline = LightBorder
)

@Composable
fun FitForgeTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            window.navigationBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = FitForgeTypography,
        shapes = FitForgeShapes,
        content = content
    )
}
