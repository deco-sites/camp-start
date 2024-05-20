interface Props {
  text: string;
}

function ExampleSection({ text }: Props) {
  return (
    <div class="flex flex-col justify-center items-center">
      <h2 class="text-base m-6">{text}</h2>
    </div>
  );
}

export default ExampleSection;
