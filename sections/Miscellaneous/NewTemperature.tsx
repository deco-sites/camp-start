import type { Temperature } from "apps/weather/loaders/temperature.ts";

interface Props {
  /**
   * @title Temperature
   */
  temperature?: Temperature | null;
}

function NewTemperature({ temperature }: Props) {
  return (
    <div class=" fixed btn p-4 mt-6 ml-4">
      <p>Temperatura em Rio de Janeiro {temperature?.celsius} graus celsius.</p>
    </div>
  );
}

export default NewTemperature;
