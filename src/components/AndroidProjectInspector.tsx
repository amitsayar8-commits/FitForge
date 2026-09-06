import React, { useState } from 'react';
import { Folder, FileCode, Copy, Check, Terminal, ExternalLink, Layers, Smartphone } from 'lucide-react';

interface AndroidProjectInspectorProps {
  onSwitchToSimulator: () => void;
}

interface ProjectFile {
  path: string;
  name: string;
  language: string;
  category: 'gradle' | 'manifest' | 'compose' | 'data' | 'test';
  content: string;
}

export const AndroidProjectInspector: React.FC<AndroidProjectInspectorProps> = ({
  onSwitchToSimulator
}) => {
  const [copied, setCopied] = useState(false);

  const files: ProjectFile[] = [
    {
      path: 'android/settings.gradle.kts',
      name: 'settings.gradle.kts',
      language: 'kotlin',
      category: 'gradle',
      content: `pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\\\.android.*")
                includeGroupByRegex("com\\\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "FitForge"
include(":app")`
    },
    {
      path: 'android/gradle/libs.versions.toml',
      name: 'libs.versions.toml',
      language: 'toml',
      category: 'gradle',
      content: `[versions]
agp = "8.7.3"
kotlin = "2.0.21"
coreKtx = "1.15.0"
composeBom = "2024.11.00"
navigationCompose = "2.8.4"
room = "2.6.1"
ksp = "2.0.21-1.0.28"
firebaseBom = "33.7.0"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version = "2.8.7" }
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room" }
androidx-room-ktx = { group = "androidx.room", name = "room-ktx", version.ref = "room" }
androidx-room-compiler = { group = "androidx.room", name = "room-compiler", version.ref = "room" }
firebase-bom = { group = "com.google.firebase", name = "firebase-bom", version.ref = "firebaseBom" }
firebase-auth = { group = "com.google.firebase", name = "firebase-auth-ktx" }
firebase-firestore = { group = "com.google.firebase", name = "firebase-firestore-ktx" }`
    },
    {
      path: 'android/app/build.gradle.kts',
      name: 'app/build.gradle.kts',
      language: 'kotlin',
      category: 'gradle',
      content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.ksp)
    alias(libs.plugins.google.services)
}

android {
    namespace = "com.fitforge.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.fitforge.app"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }
}`
    },
    {
      path: 'android/app/src/main/AndroidManifest.xml',
      name: 'AndroidManifest.xml',
      language: 'xml',
      category: 'manifest',
      content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:name=".FitForgeApp"
        android:label="@string/app_name"
        android:theme="@style/Theme.FitForge">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
    },
    {
      path: 'android/app/src/main/java/com/fitforge/app/ui/onboarding/OnboardingScreen.kt',
      name: 'OnboardingScreen.kt',
      language: 'kotlin',
      category: 'compose',
      content: `// Jetpack Compose Onboarding with 6 Steps & Room DataStore Persistence
@Composable
fun OnboardingScreen(
    viewModel: OnboardingViewModel,
    onOnboardingFinished: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    Scaffold(containerColor = CarbonBackground) { innerPadding ->
        AnimatedContent(targetState = uiState.currentStep) { step ->
            when (step) {
                0 -> WelcomeScreen()
                1 -> GoalSelectionScreen(selectedGoal = uiState.selectedGoal)
                2 -> LocationSelectionScreen(selectedLocation = uiState.selectedLocation)
                3 -> ExperienceSelectionScreen(selectedLevel = uiState.selectedLevel)
                4 -> DaysSelectionScreen(selectedDays = uiState.selectedDays)
                5 -> DurationSelectionScreen(selectedDuration = uiState.selectedDurationMinutes)
            }
        }
    }
}`
    },
    {
      path: 'android/app/src/main/java/com/fitforge/app/ui/home/HomeScreen.kt',
      name: 'HomeScreen.kt',
      language: 'kotlin',
      category: 'compose',
      content: `// FitForge Premium Home Dashboard (Material 3)
@Composable
fun HomeScreen(
    viewModel: HomeViewModel,
    onStartWorkout: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    LazyColumn(modifier = Modifier.fillMaxSize().background(CarbonBackground)) {
        item { HeaderGreeting(uiState) }
        item { WeeklyProgressCard(uiState.weeklyCompleted, uiState.weeklyGoalTarget) }
        item { QuickActionsRow() }
        item { TodayWorkoutHeroCard(uiState.todayWorkout, onStartWorkout) }
    }
}`
    },
    {
      path: 'android/app/src/main/java/com/fitforge/app/data/local/FitForgeDatabase.kt',
      name: 'FitForgeDatabase.kt',
      language: 'kotlin',
      category: 'data',
      content: `@Database(
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
}`
    }
  ];

  const [selectedFile, setSelectedFile] = useState<ProjectFile>(files[0]);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0A0A0A] text-neutral-100 p-4 sm:p-6 overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#222222]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F1F] shadow-[0_0_8px_rgba(255,95,31,0.6)]" />
            <h2 className="text-lg font-black tracking-tight text-white">
              Android Studio Project Inspector
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real Kotlin, Jetpack Compose, Gradle KTS & Room Database architecture for FitForge
          </p>
        </div>

        <button
          onClick={onSwitchToSimulator}
          className="px-4 py-2.5 rounded-xl bg-[#FF5F1F] hover:bg-[#ff753b] text-black text-xs font-black flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,95,31,0.3)] active:scale-95"
        >
          <Smartphone className="w-4 h-4" />
          <span>Launch Live Android App</span>
        </button>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 pt-4 overflow-hidden">
        {/* Left File Explorer */}
        <div className="w-full md:w-72 shrink-0 rounded-[1.5rem] bg-[#121212] border border-[#222222] p-3 flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 mb-2">
            Project Files (Phase 1)
          </span>

          <div className="flex-1 overflow-y-auto space-y-1">
            {files.map((file) => (
              <button
                key={file.path}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2.5 ${
                  selectedFile.path === file.path
                    ? 'bg-[#FF5F1F]/20 text-[#FF5F1F] border border-[#FF5F1F]/40 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#181818]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Code Viewer */}
        <div className="flex-1 rounded-[1.5rem] bg-[#121212] border border-[#222222] flex flex-col overflow-hidden">
          {/* File Header */}
          <div className="h-12 px-4 border-b border-[#222222] flex items-center justify-between bg-[#141414]">
            <span className="text-xs font-mono text-neutral-300 font-medium truncate">
              {selectedFile.path}
            </span>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[#181818] border border-[#262626] text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#FF5F1F]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Content */}
          <div className="flex-1 p-4 overflow-auto bg-[#0A0A0A]">
            <pre className="text-xs font-mono leading-relaxed text-neutral-200 selection:bg-[#FF5F1F] selection:text-black">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
