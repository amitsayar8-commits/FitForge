package com.fitforge.app.data.local

import androidx.room.*
import com.fitforge.app.data.model.WorkoutPlan
import com.fitforge.app.data.model.WorkoutHistoryRecord
import com.fitforge.app.data.model.PersonalRecord
import com.fitforge.app.data.model.BodyWeightLog
import kotlinx.coroutines.flow.Flow

@Dao
interface WorkoutDao {
    @Query("SELECT * FROM workout_plans")
    fun getAllWorkoutPlans(): Flow<List<WorkoutPlan>>

    @Query("SELECT * FROM workout_plans WHERE environment = :env")
    fun getWorkoutPlansByEnvironment(env: String): Flow<List<WorkoutPlan>>

    @Query("SELECT * FROM workout_plans WHERE id = :id")
    suspend fun getWorkoutPlanById(id: String): WorkoutPlan?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWorkoutPlan(plan: WorkoutPlan)

    @Delete
    suspend fun deleteWorkoutPlan(plan: WorkoutPlan)

    // History
    @Query("SELECT * FROM workout_history ORDER BY dateTimestamp DESC")
    fun getAllHistory(): Flow<List<WorkoutHistoryRecord>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertHistoryRecord(record: WorkoutHistoryRecord)

    // PRs
    @Query("SELECT * FROM personal_records ORDER BY achievedTimestamp DESC")
    fun getAllPersonalRecords(): Flow<List<PersonalRecord>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertOrUpdatePR(pr: PersonalRecord)

    // Weight Logs
    @Query("SELECT * FROM body_weight_logs ORDER BY dateTimestamp DESC")
    fun getAllWeightLogs(): Flow<List<BodyWeightLog>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWeightLog(log: BodyWeightLog)
}
