<template>
    <div class="accordion" :id="id">
        <slot/>
    </div>
</template>

<script>
export default defineComponent({
    name: 'accordion',
    props: {
        id: {
            default: null,
        }
    },
    mounted() {
        this.$nextTick(() => {
            const accordionButtons = document.querySelectorAll(".accordion-button");

            accordionButtons.forEach((button) => {
                button.addEventListener("click", function () {
                    accordionButtons.forEach((button) => {
                        if (button !== this) {
                            button.classList.add("collapsed");
                            button.parentElement.nextElementSibling.classList.remove("show");
                            button.parentElement.nextElementSibling.style.maxHeight = '0';
                        }
                    });

                    const expanded = !this.classList.contains("collapsed");
                    const content = this.parentElement.nextElementSibling;

                    if (expanded) {
                        this.classList.add("collapsed");
                        this.parentElement.nextElementSibling.classList.remove("show")
                        content.style.maxHeight = '0';
                    } else {
                        this.classList.remove("collapsed");
                        this.parentElement.nextElementSibling.classList.add("show")
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                });
            });
        });
    },
});
</script>

