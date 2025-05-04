<template>
  <StudentNav v-if="isStudent"></StudentNav>
  <TeacherNav v-if="isTeacher"></TeacherNav>
  <OtherUserNav v-if="isOther"></OtherUserNav>
</template>

<script>
import StudentNav from "@/components/StudentNav.vue";
import TeacherNav from "@/components/TeacherNav.vue";
import OtherUserNav from "./OtherUserNav.vue";
import { ref } from "vue";

export default {
components: {
    StudentNav,
    TeacherNav,
    OtherUserNav,
  },
  setup() {

    const userRole = localStorage.getItem("userRole");
    const isStudent = ref(false);
    const isTeacher = ref(false);
    const isOther = ref(false);

    // check user role
    if (userRole === "student") {
      isStudent.value = true;
    } else if (userRole === "teacher") {
      isTeacher.value = true;
    } else {
      isOther.value = true;
    }

    return {
      userRole,
      isStudent,
      isTeacher,
      isOther,
    };
  },
}
</script>

<style>

</style>