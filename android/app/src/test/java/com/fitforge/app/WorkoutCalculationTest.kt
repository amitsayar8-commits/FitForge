package com.fitforge.app

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class WorkoutCalculationTest {

    @Test
    fun testEstimatedCalorieCalculation() {
        val durationMinutes = 45
        val baseMet = 6.0f // Heavy resistance training MET
        val userWeightKg = 75.0f
        // Calories = MET * weight(kg) * (duration / 60)
        val estimated = (baseMet * userWeightKg * (durationMinutes / 60.0f)).toInt()

        assertTrue(estimated in 300..400)
        assertEquals(337, estimated)
    }

    @Test
    fun testRestTimerValidation() {
        val allowedRestPeriods = listOf(30, 45, 60, 90, 120, 180)
        val defaultRest = 90
        assertTrue(allowedRestPeriods.contains(defaultRest))
    }
}
