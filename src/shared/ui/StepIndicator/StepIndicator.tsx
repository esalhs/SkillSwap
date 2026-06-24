import styles from './StepIndicator.module.css'

type StepIndicatorProps = {
  currentStep: number
  totalSteps: number
}

export const StepIndicator = (props: StepIndicatorProps) => {
  const steps = Array.from({ length: props.totalSteps })
  return (
    <div className={styles.stepIndicator}>
      <span className={styles.stepsText}>{`Шаг ${props.currentStep} из ${props.totalSteps}`}</span>
      <div className={styles.stepContainer}>
        {steps.map((_, i) => {
          return (
            <div
              key={i}
              className={`${styles.progressLine} ${i < props.currentStep && styles.active}`}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
