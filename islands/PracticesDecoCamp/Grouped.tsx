import { effect, signal } from "@preact/signals";

export interface Person {
  firstName: string;
  lastName: string;
}

const person = signal<Person>({
  firstName: "John",
  lastName: "Doe",
});

// ao ter alterações em firstName ou lastName, ele vai rodar o effect, pois ele está dentro do mesmo signal
effect(() => {
  console.log(`Grouped effect first name: ${person.value.firstName}`);
  console.log("--------------------");
});

// effect(() => {
//   console.log(`grouped effect last name: ${person.value.lastName}`);
// });

export default function Grouped() {
  return (
    <div class="p-4 rounded-xl shadow-xl bg bg-gray-200">
      <p class="mb-2">
        The name is {person.value.firstName} {person.value.lastName}
      </p>
      <div class="space-x-2">
        <input
          type="text"
          class="input"
          placeholder="First Name"
          onInput={(e) => {
            person.value = {
              ...person.value,
              firstName: e.currentTarget.value,
            };
          }}
        />
      </div>
      <div class="space-x-2">
        <input
          type="text"
          class="input"
          placeholder="Last Name"
          onInput={(e) => {
            person.value = {
              ...person.value,
              lastName: e.currentTarget.value,
            };
          }}
        />
      </div>
    </div>
  );
}
