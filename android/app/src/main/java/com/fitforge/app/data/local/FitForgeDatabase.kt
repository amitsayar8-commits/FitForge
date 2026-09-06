package com.fitforge.app.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.fitforge.app.data.model.Exercise
import com.fitforge.app.data.model.WorkoutPlan
import com.fitforge.app.data.model.WorkoutHistoryRecord
import com.fitforge.app.data.model.PersonalRecord
import com.fitforge.app.data.model.BodyWeightLog

@Database(
    entities = [
        Exercise::class,
        WorkoutPlan::class,
        WorkoutHistoryRecord::class,
        PersonalRecord::class,
        BodyWeightLog::class
    ],
    version = 1,
    exportSchema = false
)
abstract class FitForgeDatabase : RoomDatabase() {
    abstract fun exerciseDao(): ExerciseDao
    abstract fun workoutDao(): WorkoutDao

    companion object {
        @Volatile
        private var INSTANCE: FitForgeDatabase? = null

        fun getInstance(context: Context): FitForgeDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    FitForgeDatabase::class.java,
                    "fitforge_database"
                )
                .fallbackToDestructiveMigration()
                .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
