package com.fitforge.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.navigation.compose.rememberNavController
import com.fitforge.app.navigation.FitForgeNavGraph
import com.fitforge.app.ui.theme.FitForgeTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            FitForgeTheme(darkTheme = true) {
                val navController = rememberNavController()
                FitForgeNavGraph(navController = navController)
            }
        }
    }
}
