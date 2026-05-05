<!--suppress CssUnknownTarget -->
<style scoped lang="scss">
.accordion-item {
    color: rgb(168, 168, 168);
    border-color: rgb(27, 27, 27);
    background-color: rgb(42, 42, 42);
    font-weight: normal;
}

.accordion-button {
    border-color: rgb(27, 27, 27);
    background-color: rgb(42, 42, 42);
    color: #ffffff;

    &:not(.collapsed) {
        background-color: #3c3c3c;
        box-shadow: none;
    }
}

.accordion-button::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23a8a8a8'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-button:not(.collapsed)::after {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ffffff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-header-only {
    background-color: #3c3c3c;

    & > h2:first-child {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
    }

    & > h2 {

        display: block;

        & > button {
            font-size: 21px;
            background-color: transparent;
            border: none;
            color: white;
            display: block;
            margin: 0 auto;

            & > strong {
                margin: 6px auto 6px auto;
                display: block;
            }

            &:after {
                background-image: unset !important;
            }
        }
    }
}
</style>

<template>
    <div class="accordion-item">
        <h2 class="accordion-header" :id="'heading'+ guid">
            <button v-if="closeable" class="accordion-button" type="button" data-bs-toggle="collapse" 
                    :data-bs-target="'#collapse' + guid" aria-expanded="true" :aria-controls="'collapse' + guid">
                {{ title }}
            </button>
            <button v-else class="accordion-button">
                {{ title }}
            </button>
        </h2>
        <div :id="'collapse' + guid" class="accordion-collapse collapse" :class="{'show': show}"
             :aria-labelledby="'heading' + guid" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <slot name="body"/>
            </div>
        </div>
    </div>
</template>

<script>
import {v4 as newGuid} from "uuid";

export default {
    name: "accordion-item",
    props: {
        title: {
            default: "",
        },
        show: {
            default: false,
        },
        closeable: {
            default: true,
        },
    },
    data() {
        return {
            guid: newGuid(),
        }
    }
}
</script>