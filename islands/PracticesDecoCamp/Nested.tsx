import { effect, signal } from "@preact/signals";

// também, é possivel uma propriedade que quarda os signals, ex abaixo:
// assim tiraria a necessidade de usar o .value | person.value.firstName.value, ficando person.firstName.value
// const person = {
//   firstName: signal<string>("John"),
//   lastName: signal<string>("Doe"),
// };

const person = signal({
  firstName: signal<string>("John"),
  lastName: signal<string>("Doe"),
});

effect(() => {
  console.log(`-> Nested effect first name: ${person.value.firstName}`);
});

effect(() => {
  console.log(`=>Nested effect last name: ${person.value.lastName}`);
});

export default function Nested() {
  return (
    <div class="p-4 rounded-xl shadow-xl bg bg-gray-200">
      <p class="mb-2">
        The name is {person.value.firstName.value} {person.value.lastName.value}
      </p>
      <div class="space-x-2">
        <input
          type="text"
          class="input"
          placeholder="First Name"
          onInput={(e) => {
            person.value.firstName.value = e.currentTarget.value;
          }}
        />
      </div>
      <div class="space-x-2">
        <input
          type="text"
          class="input"
          placeholder="Last Name"
          onInput={(e) => {
            person.value.lastName.value = e.currentTarget.value;
          }}
        />
      </div>
    </div>
  );
}
