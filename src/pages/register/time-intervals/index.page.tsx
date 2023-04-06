import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalContainer
} from "./styles";
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { getWeekDays } from "@/utils/get-week-days";
import { Container, Header } from "../styles";
import { ArrowRight } from "phosphor-react";
import { z } from "zod";

const timeIntervalsFormSchema = z.object({});

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    control } = useForm({
      defaultValues: {
        intervals: [
          { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
          { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
          { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
        ]
      }
    });

  /* Permite manipular um array criado no defaultValues */
  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  });

  const weekDays = getWeekDays();
  const intervalWatch = watch('intervals');

  const handleSetTimeIntervals = async () => { };

  return (
    <Container>
      <Header>
        <Heading as='strong'>
          Quase lá!
        </Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da semana.
        </Text>

        <MultiStep size={4} currentStep={3} />

        <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
          <IntervalContainer>
            {fields.map((intervalItem, index) => {
              return (
                <IntervalItem key={intervalItem.id}>
                  <IntervalDay>
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Checkbox
                            onCheckedChange={(checked) => {
                              field.onChange(checked === true)
                            }}
                            checked={field.value}
                          />
                        )
                      }}
                    />
                    <Text>{weekDays[intervalItem.weekDay]}</Text>
                  </IntervalDay>
                  <IntervalInputs>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60} /* Minutos de intervalo que vai aparecer nesse caso de hora em hora */
                      disabled={intervalWatch[index].enabled === false}
                      {...register(`intervals.${index}.startTime`)}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={intervalWatch[index].enabled === false}
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </IntervalInputs>
                </IntervalItem>
              )
            })}
          </IntervalContainer>

          <Button type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        </IntervalBox>

      </Header>
    </Container>
  );
};