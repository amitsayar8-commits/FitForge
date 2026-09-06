package com.fitforge.app.data.repository

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.*
import androidx.datastore.preferences.preferencesDataStore
import com.fitforge.app.data.local.ExerciseDao
import com.fitforge.app.data.local.WorkoutDao
import com.fitforge.app.data.model.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.map
import java.io.IOException

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "fitforge_prefs")

class FitForgeRepository(
    private val exerciseDao: ExerciseDao,
    private val workoutDao: WorkoutDao,
    private val context: Context
) {
    private object PreferencesKeys {
        val ONBOARDING_COMPLETED = booleanPreferencesKey("onboarding_completed")
        val PRIMARY_GOAL = stringPreferencesKey("primary_goal")
        val WORKOUT_LOCATION = stringPreferencesKey("workout_location")
        val EXPERIENCE_LEVEL = stringPreferencesKey("experience_level")
        val WORKOUT_DAYS = intPreferencesKey("workout_days")
        val WORKOUT_DURATION = intPreferencesKey("workout_duration")
        val USER_NAME = stringPreferencesKey("user_name")
        val CURRENT_STREAK = intPreferencesKey("current_streak")
        val BEST_STREAK = intPreferencesKey("best_streak")
        val CURRENT_WEIGHT = floatPreferencesKey("current_weight")
        val TARGET_WEIGHT = floatPreferencesKey("target_weight")
        val UNIT_SYSTEM = stringPreferencesKey("unit_system")
        val SOUND_ENABLED = booleanPreferencesKey("sound_enabled")
        val VIBRATION_ENABLED = booleanPreferencesKey("vibration_enabled")
        val DEFAULT_REST_SEC = intPreferencesKey("default_rest_sec")
    }

    val userPreferencesFlow: Flow<UserPreferences> = context.dataStore.data
        .catch { exception ->
            if (exception is IOException) {
                emit(emptyPreferences())
            } else {
                throw exception
            }
        }
        .map { prefs ->
            UserPreferences(
                isOnboardingCompleted = prefs[PreferencesKeys.ONBOARDING_COMPLETED] ?: false,
                primaryGoal = prefs[PreferencesKeys.PRIMARY_GOAL] ?: "Build Muscle",
                workoutLocation = prefs[PreferencesKeys.WORKOUT_LOCATION] ?: "GYM",
                experienceLevel = prefs[PreferencesKeys.EXPERIENCE_LEVEL] ?: "Intermediate",
                workoutDaysPerWeek = prefs[PreferencesKeys.WORKOUT_DAYS] ?: 4,
                workoutDurationMinutes = prefs[PreferencesKeys.WORKOUT_DURATION] ?: 45,
                userName = prefs[PreferencesKeys.USER_NAME] ?: "Alex Forge",
                currentStreak = prefs[PreferencesKeys.CURRENT_STREAK] ?: 4,
                bestStreak = prefs[PreferencesKeys.BEST_STREAK] ?: 12,
                currentWeightKg = prefs[PreferencesKeys.CURRENT_WEIGHT] ?: 76.5f,
                targetWeightKg = prefs[PreferencesKeys.TARGET_WEIGHT] ?: 80.0f,
                unitSystem = prefs[PreferencesKeys.UNIT_SYSTEM] ?: "metric",
                soundEnabled = prefs[PreferencesKeys.SOUND_ENABLED] ?: true,
                vibrationEnabled = prefs[PreferencesKeys.VIBRATION_ENABLED] ?: true,
                defaultRestSeconds = prefs[PreferencesKeys.DEFAULT_REST_SEC] ?: 90
            )
        }

    suspend fun saveOnboardingPreferences(
        goal: String,
        location: String,
        level: String,
        days: Int,
        duration: Int
    ) {
        context.dataStore.edit { prefs ->
            prefs[PreferencesKeys.ONBOARDING_COMPLETED] = true
            prefs[PreferencesKeys.PRIMARY_GOAL] = goal
            prefs[PreferencesKeys.WORKOUT_LOCATION] = location
            prefs[PreferencesKeys.EXPERIENCE_LEVEL] = level
            prefs[PreferencesKeys.WORKOUT_DAYS] = days
            prefs[PreferencesKeys.WORKOUT_DURATION] = duration
        }
    }

    suspend fun updateSettings(
        soundEnabled: Boolean,
        vibrationEnabled: Boolean,
        unitSystem: String,
        defaultRest: Int
    ) {
        context.dataStore.edit { prefs ->
            prefs[PreferencesKeys.SOUND_ENABLED] = soundEnabled
            prefs[PreferencesKeys.VIBRATION_ENABLED] = vibrationEnabled
            prefs[PreferencesKeys.UNIT_SYSTEM] = unitSystem
            prefs[PreferencesKeys.DEFAULT_REST_SEC] = defaultRest
        }
    }

    fun getAllExercises(): Flow<List<Exercise>> = exerciseDao.getAllExercises()
    fun getExercisesByEnvironment(env: String): Flow<List<Exercise>> = exerciseDao.getExercisesByEnvironment(env)
    fun getAllWorkoutPlans(): Flow<List<WorkoutPlan>> = workoutDao.getAllWorkoutPlans()
    fun getWorkoutHistory(): Flow<List<WorkoutHistoryRecord>> = workoutDao.getAllHistory()
    fun getPersonalRecords(): Flow<List<PersonalRecord>> = workoutDao.getAllPersonalRecords()
    fun getWeightLogs(): Flow<List<BodyWeightLog>> = workoutDao.getAllWeightLogs()

    suspend fun insertWorkoutPlan(plan: WorkoutPlan) = workoutDao.insertWorkoutPlan(plan)
    suspend fun saveHistoryRecord(record: WorkoutHistoryRecord) = workoutDao.insertHistoryRecord(record)
    suspend fun savePR(pr: PersonalRecord) = workoutDao.insertOrUpdatePR(pr)
    suspend fun saveWeightLog(log: BodyWeightLog) = workoutDao.insertWeightLog(log)
}
