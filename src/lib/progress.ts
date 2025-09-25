export interface UserProgress {
  tutorialId: string;
  currentStep: number;
  completed: boolean;
  completedAt?: Date;
}

export class ProgressManager {
  private static STORAGE_KEY = 'autoflow_progress';

  static getProgress(): Record<string, UserProgress> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  static setProgress(tutorialId: string, progress: UserProgress): void {
    try {
      const current = this.getProgress();
      current[tutorialId] = progress;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  static getTutorialProgress(tutorialId: string): UserProgress | null {
    const progress = this.getProgress();
    return progress[tutorialId] || null;
  }

  static markStepComplete(tutorialId: string, step: number): void {
    const current = this.getTutorialProgress(tutorialId) || {
      tutorialId,
      currentStep: 0,
      completed: false
    };

    current.currentStep = Math.max(current.currentStep, step + 1);
    this.setProgress(tutorialId, current);
  }

  static markTutorialComplete(tutorialId: string): void {
    const current = this.getTutorialProgress(tutorialId) || {
      tutorialId,
      currentStep: 0,
      completed: false
    };

    current.completed = true;
    current.completedAt = new Date();
    this.setProgress(tutorialId, current);
  }

  static getOverallProgress(): { completed: number; total: number; percentage: number } {
    const progress = this.getProgress();
    const tutorials = Object.values(progress);
    const completed = tutorials.filter(t => t.completed).length;
    const total = Math.max(tutorials.length, 3); // Minimum 3 tutorials
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    return { completed, total, percentage };
  }
}
