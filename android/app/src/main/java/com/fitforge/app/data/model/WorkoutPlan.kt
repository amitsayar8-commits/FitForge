package com.fitforge.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "workout_plans")
data class WorkoutPlan(
    @PrimaryKey val id: String,
    val title: String,
    val subtitle: String,
    val environment: String, // "GYM" or "HOME"
    val category: String,    // "Push/Pull/Legs", "Full Body", "Upper/Lower", "HIIT", "Mobility", "Bodyweight"
    val difficulty: String,  // "Beginner", "Intermediate", "Advanced"
    val durationMinutes: Int,
    val estimatedCalories: Int,
    val exerciseIdsCsv: String,
    val isCustom: Boolean = false
)

@Entity(tableName = "workout_history")
data class WorkoutHistoryRecord(
    @PrimaryKey val id: String,
    val workoutPlanId: String,
    val workoutTitle: String,
    val dateTimestamp: Long,
    val durationSeconds: Int,
    val totalExercises: Int,
    val totalSets: Int,
    val totalReps: Int,
    val totalVolumeKg: Float,
    val estimatedCalories: Int
)

@Entity(tableName = "personal_records")
data class PersonalRecord(
    @PrimaryKey val exerciseId: String,
    val exerciseName: String,
    val previousWeightKg: Float,
    val currentRecordKg: Float,
    val reps: Int,
    val achievedTimestamp: Long
)

@Entity(tableName = "body_weight_logs")
data class BodyWeightLog(
    @PrimaryKey val id: String,
    val weightKg: Float,
    val dateTimestamp: Long,
    val notes: String = ""
)
