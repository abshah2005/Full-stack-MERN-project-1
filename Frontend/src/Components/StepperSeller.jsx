import React from 'react'
import {
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
  } from '@chakra-ui/react'

  const steps = [
    { title: 'First', description: 'Contact Info', },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
  ]

const StepperSeller = () => {
      
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
      })

  return (
    <Stepper size='lg' index={activeStep}>
    {steps.map((step, index) => (
      <Step key={index} onClick={() => setActiveStep(index)}>
        <StepIndicator>
          <StepStatus
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            active={<StepNumber />}
          />
        </StepIndicator>

        <Box flexShrink='0'>
          <StepTitle>{step.title}</StepTitle>
          <StepDescription>{step.description}</StepDescription>
        </Box>

        <StepSeparator />
      </Step>
    ))}
  </Stepper>
  )
}

export default StepperSeller
 