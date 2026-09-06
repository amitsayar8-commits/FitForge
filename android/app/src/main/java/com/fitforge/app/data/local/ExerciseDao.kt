package com.fitforge.app.data.local

import androidx.room.*
import com.fitforge.app.data.model.Exercise
import kotlinx.coroutines.flow.Flow

@Dao
interface ExerciseDao {
    @Query("SELECT * FROM exercises")
    fun getAllExercises(): Flow<List<Exercise>>

    @Query("SELECT * FROM exercises WHERE id = :id")
    suspend fun getExerciseById(id: String): Exercise?

    @Query("SELECT * FROM exercises WHERE environment = :env OR environment = 'BOTH'")
    fun getExercisesByEnvironment(env: String): Flow<List<Exercise>>

    @Query("SELECT * FROM exercises WHERE category = :category")
    fun getExercisesByCategory(category: String): Flow<List<Exercise>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertExercises(exercises: List<Exercise>)

    @Update
    suspend fun updateExercise(exercise: Exercise)

    @Query("UPDATE exercises SET isFavorite = :isFav WHERE id = :id")
    suspend fun updateFavorite(id: String, isFav: Boolean)
}
