package com.fitforge.app

import android.app.Application
import com.fitforge.app.data.local.FitForgeDatabase
import com.fitforge.app.data.repository.FitForgeRepository

class FitForgeApp : Application() {

    val database: FitForgeDatabase by lazy {
        FitForgeDatabase.getInstance(this)
    }

    val repository: FitForgeRepository by lazy {
        FitForgeRepository(
            exerciseDao = database.exerciseDao(),
            workoutDao = database.workoutDao(),
            context = this
        )
    }

    override fun onCreate() {
        super.onCreate()
        instance = this
    }

    companion object {
        lateinit var instance: FitForgeApp
            private set
    }
}
