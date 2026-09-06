package com.fitforge.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "exercises")
data class Exercise(
    @PrimaryKey val id: String,
    val name: String,
    val category: String,          // "Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "HIIT", "Mobility"
    val targetMuscle: String,      // e.g. "Chest"
    val secondaryMuscles: String,  // e.g. "Triceps, Front Delts"
    val equipment: String,         // "Barbell + Bench", "Dumbbells", "Bodyweight", "Resistance Bands", "Kettlebell"
    val difficulty: String,        // "Beginner", "Intermediate", "Advanced"
    val environment: String,       // "GYM", "HOME", "BOTH"
    val description: String,
    val instructions: String,
    val defaultSets: Int = 4,
    val defaultReps: String = "8-12",
    val defaultDurationSec: Int = 0,
    val defaultRestSeconds: Int = 90,
    val tips: String,
    val commonMistakes: String,
    val isFavorite: Boolean = false
)
