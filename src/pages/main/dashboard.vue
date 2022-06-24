<template>
  <div>
    <h1 class="text-xl font-bold leading-9">Widgets Sample</h1>
    <h2 class="text-lg font-bold leading-6 mt-6">Tooltip</h2>
    <Tooltip content="Hola" class="mr-3"><label>Hover ME!</label></Tooltip>
    <Tooltip content="Hola" class="mr-3" placement="right">
      <label>Hover ME!</label>
    </Tooltip>
    <Tooltip content="Hola" class="mr-3" placement="bottom">
      <label>Hover ME!</label>
    </Tooltip>
    <Tooltip content="Hola" class="mr-3" placement="left">
      <label>Hover ME!</label>
    </Tooltip>

    <h2 class="text-lg font-bold leading-6 mt-6">Select</h2>
    <h3 class="text-md font-medium leading-6">Default</h3>
    <div class="w-64">
      <Select
        v-model="form.select"
        placeholder="請選擇..."
        :options="[
          {
            value: 'Y',
            children: 'Yes',
          },
          {
            value: 'N',
            children: 'No',
          },
        ]"
      >
      </Select>
    </div>
    <div>value: {{ form.select }}</div>
    <h3 class="text-md font-medium leading-6 mt-3">Readonly Style</h3>
    <div class="w-64">
      <Select
        v-model="form.select"
        placeholder="請選擇..."
        :options="[
          {
            value: 'Y',
            children: 'Yes',
          },
          {
            value: 'N',
            children: 'No',
          },
        ]"
        readonly
      >
      </Select>
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">Multiple</h3>
    <div class="w-64">
      <Select
        v-model="form.select2"
        placeholder="請選擇..."
        :options="[
          {
            value: 'Red',
            children: 'Red',
          },
          {
            value: 'Blue',
            children: 'Blue',
            disabled: true,
          },
          {
            value: 'Yellow',
            children: 'Yellow',
          },
          {
            value: 'Orange',
            children: 'Orange',
          },
        ]"
      >
      </Select>
    </div>
    <div class="mb-3">value: {{ form.select2 }}</div>
    <h3 class="text-md font-medium leading-6 mt-3">With Filter</h3>
    <div class="w-64">
      <Select
        v-model="form.select3"
        placeholder="請選擇..."
        :options="[
          {
            value: 'Red',
            children: 'Red',
          },
          {
            value: 'Blue',
            children: 'Blue',
          },
          {
            value: 'Yellow',
            children: 'Yellow',
          },
          {
            value: 'Orange',
            children: 'Orange',
          },
        ]"
        input
      >
      </Select>
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">With Template</h3>
    <div class="w-64">
      <Select
        v-model="form.select4"
        placeholder="請選擇..."
        :options="[
          {
            value: 'Red',
            children: 'Red',
            icon: 'far fa-circle text-red-400',
          },
          {
            value: 'Blue',
            children: 'Blue',
            icon: 'far fa-circle text-blue-400',
          },
          {
            value: 'Yellow',
            children: 'Yellow',
            icon: 'far fa-circle text-yellow-400',
          },
          {
            value: 'Orange',
            children: 'Orange',
            icon: 'far fa-circle',
            disabled: true,
          },
        ]"
      >
        <template v-slot="{ item, active, onClick }">
          <div
            class="flex py-2 px-4 text-sm space-x-2"
            :class="[
              active && 'bg-gray-200 hover:bg-gray-200',
              item.disabled && 'bg-gray-100 text-gray-300',
              !item.disabled && 'cursor-pointer hover:bg-gray-100',
            ]"
            @click="onClick"
          >
            <div><i :class="item.icon"></i></div>
            <div>{{ item.children }}({{ item.value }})</div>
          </div>
        </template>
      </Select>
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">With Virtual</h3>
    <div class="w-64">
      <Select
        v-model="form.select5"
        placeholder="請選擇..."
        :options="
          times(
            (idx) => ({
              value: idx,
              children: idx,
            }),
            10000
          )
        "
        virtual
      >
      </Select>
    </div>
    <h2 class="text-lg font-bold leading-6 mt-6">Button</h2>
    <h3 class="text-md font-medium leading-6">Change Theme</h3>
    <div>
      <Button class="mr-1" @click="setTheme('cyan')" type="cyan"
        >Change To Cyan</Button
      >
      <Button class="mr-1" @click="setTheme('orange')" type="orange">
        Change To Orange
      </Button>
      <Button class="mr-1" @click="setTheme('teal')" type="teal">
        Change To Teal
      </Button>
      <Button class="mr-1" @click="setTheme('pink')" type="pink">
        Change To Pink
      </Button>
      <Button class="mr-1" @click="setTheme('rose')" type="rose">
        Change To Rose
      </Button>
    </div>
    <h3 class="text-md font-medium leading-6">Styles</h3>
    <div>
      <Button class="mr-1" @click="F">Primary</Button>
      <Button class="mr-1" @click="F" type="cyan">Cyan</Button>
      <Button class="mr-1" @click="F" type="default">Default</Button>
      <Button class="mr-1" @click="F" type="dark">Dark</Button>
      <Button class="mr-1" @click="F" type="light">Light</Button>
      <Button class="mr-1" @click="F" type="green">Green</Button>
      <Button class="mr-1" @click="F" type="red">Red</Button>
      <Button class="mr-1" @click="F" type="yellow">Yellow</Button>
      <Button class="mr-1" @click="F" type="orange">Orange</Button>
      <Button class="mr-1" @click="F" type="purple">Purple</Button>
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">Disabled</h3>
    <div>
      <Button class="mr-1" @click="F" disabled>Primary</Button>
      <Button class="mr-1" @click="F" type="cyan" disabled>Cyan</Button>
      <Button class="mr-1" @click="F" type="default" disabled>Default</Button>
      <Button class="mr-1" @click="F" type="dark" disabled>Dark</Button>
      <Button class="mr-1" @click="F" type="light" disabled>Light</Button>
      <Button class="mr-1" @click="F" type="green" disabled>Green</Button>
      <Button class="mr-1" @click="F" type="red" disabled>Red</Button>
      <Button class="mr-1" @click="F" type="yellow" disabled>Yellow</Button>
      <Button class="mr-1" @click="F" type="orange" disabled>Orange</Button>
      <Button class="mr-1" @click="F" type="purple" disabled>Purple</Button>
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">Sizes</h3>
    <div>
      <Button class="mr-1" @click="F" size="xs">Extra small</Button>
      <Button class="mr-1" @click="F" size="sm">Small</Button>
      <Button class="mr-1" @click="F" size="md">Base</Button>
      <Button class="mr-1" @click="F" size="lg">Large</Button>
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">Loading</h3>
    <div>
      <Button class="mr-1" @click="F" size="xs" loading>Primary</Button>
      <Button class="mr-1" @click="F" size="sm" loading>Primary</Button>
      <Button class="mr-1" @click="F" size="md" loading>Primary</Button>
      <Button class="mr-1" @click="F" size="lg" loading>Primary</Button>
    </div>
    <h2 class="text-lg font-bold leading-6 mt-6">Datetime Picker</h2>
    <h3 class="text-md font-medium leading-6">Normal</h3>
    <div class="w-64">
      <DatetimePicker
        v-model="form.date"
        placeholder="請選擇..."
        tools:today
        tools:clear
        input
      />
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">Only Date</h3>
    <div class="w-64">
      <DatetimePicker
        v-model="form.date"
        placeholder="請選擇..."
        tools:today
        tools:clear
        no:time
      />
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">Has Max DateTime</h3>
    <div class="w-64">
      <DatetimePicker
        v-model="form.date"
        placeholder="請選擇..."
        max-date-time="2022-01-20 20:00:00"
        tools:today
        tools:clear
      />
    </div>
    <h2 class="text-lg font-bold leading-6 mt-6">
      Plugin:
      <a
        href="https://sweetalert2.github.io/"
        class="text-cyan-500 underline hover:text-cyan-600"
        target="_blank"
      >
        SweetAlert
      </a>
    </h2>
    <h3 class="text-md font-medium leading-6 mt-3">Alert</h3>
    <div>
      <Button class="mr-1" @click="alert('info')" type="default">Info</Button>
      <Button class="mr-1" @click="alert('success')" type="green">
        Success
      </Button>
      <Button class="mr-1" @click="alert('warning')" type="yellow">
        Warning
      </Button>
      <Button class="mr-1" @click="alert('error')" type="red">Error</Button>
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">Confirm</h3>
    <div>
      <Button class="mr-1" @click="confirm('info')" type="default">Info</Button>
      <Button class="mr-1" @click="confirm('success')" type="green">
        Success
      </Button>
      <Button class="mr-1" @click="confirm('warning')" type="yellow">
        Warning
      </Button>
      <Button class="mr-1" @click="confirm('error')" type="red">Error</Button>
    </div>
    <h3 class="text-md font-medium leading-6 mt-3">Custom Icon Color</h3>
    <div>
      <Button class="mr-1" type="green" @click="customConfirm('green')">
        Green Question
      </Button>
      <Button class="mr-1" type="red" @click="customConfirm('red')">
        Red Question
      </Button>
    </div>
  </div>
</template>
<script>
import { reactive, inject } from "vue";
import {
  ALERT_INFO,
  ALERT_SUCCESS,
  ALERT_WARNING,
  ALERT_ERROR,
  CONFIRM_INFO,
  CONFIRM_WARNING,
  CONFIRM_SUCCESS,
  CONFIRM_ERROR,
  CONFIRM_QUESTION_GREEN,
  CONFIRM_QUESTION_RED,
} from "@/plugins/sweetalert";
import Tooltip from "@/widgets/tooltip";
import Select from "@/widgets/select";
import Button from "@/widgets/button";
import DatetimePicker from "@/widgets/datetime-picker";
import { times, F } from "ramda";
export default {
  needAuth: false,
  components: {
    Tooltip,
    Select,
    Button,
    DatetimePicker,
  },
  setup() {
    const swal = inject("$swal");
    const storage = inject("$storage");
    const form = reactive({
      select: "Y",
      select2: ["Red", "Yellow"],
      select3: [],
      select4: "",
      select5: -1,
      date: "",
    });
    const alert = (type) => {
      const options = {
        confirmButtonText: "確認",
        title: "這是一個彈窗",
        text: "描述文字描述文字描述文字描述文字",
      };
      const types = {
        info: ALERT_INFO,
        success: ALERT_SUCCESS,
        warning: ALERT_WARNING,
        error: ALERT_ERROR,
      };
      swal.fire({ ...types[type], ...options });
    };
    const confirm = (type) => {
      const options = {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        title: "這是一個彈窗",
        text: "描述文字描述文字描述文字描述文字",
      };
      const types = {
        info: CONFIRM_INFO,
        success: CONFIRM_SUCCESS,
        warning: CONFIRM_WARNING,
        error: CONFIRM_ERROR,
      };
      swal.fire({ ...types[type], ...options });
    };
    const customConfirm = (type) => {
      const options = {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        title: "這是一個彈窗",
        text: "描述文字描述文字描述文字描述文字",
      };
      const types = {
        green: CONFIRM_QUESTION_GREEN,
        red: CONFIRM_QUESTION_RED,
      };
      swal.fire({ ...types[type], ...options });
    };
    const setTheme = (value) => {
      storage.set("theme", value);
      window.location.reload(true);
    };
    return {
      form,
      F,
      times,
      alert,
      confirm,
      customConfirm,
      setTheme,
    };
  },
};
</script>
