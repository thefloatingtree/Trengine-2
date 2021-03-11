<template>
    <div class="field is-grouped">
        <p class="control">
            <button
                @click="onPlay()"
                class="button is-primary is-inverted has-tooltip-arrow has-tooltip-bottom"
                data-tooltip="Play Scene"
                :disabled="!playEnabled"
            >
                <span class="icon">
                    <font-awesome-icon icon="play" />
                </span>
            </button>
        </p>
        <p class="control">
            <button
                @click="onPause()"
                class="button is-dark is-inverted has-tooltip-arrow has-tooltip-bottom"
                data-tooltip="Pause Scene"
                :disabled="!pauseEnabled"
            >
                <span class="icon">
                    <font-awesome-icon icon="pause" />
                </span>
            </button>
        </p>
        <p class="control">
            <button
                @click="onStop()"
                class="button is-danger is-inverted has-tooltip-arrow has-tooltip-bottom"
                data-tooltip="Stop Scene"
                :disabled="!stopEnabled"
            >
                <span class="icon">
                    <font-awesome-icon icon="stop" />
                </span>
            </button>
        </p>
    </div>
</template>

<script>
import { Treditor } from "../Treditor";
export default {
    computed: {
        playEnabled() {
            return this.paused || !this.engineStarted;
        },
        pauseEnabled() {
            return !this.paused && this.engineStarted;
        },
        stopEnabled() {
            return this.engineStarted
        }
    },
    data() {
        return {
            paused: false,
            engineStarted: false,
        };
    },
    methods: {
        onPlay() {
            if (this.paused) {
                Treditor.play();
            } else {
                this.$store.commit("hideEditor");
                Treditor.startEngine();
                this.engineStarted = true;
            }
            this.paused = false;
        },
        onStop() {
            if (!this.engineStarted) return;

            this.$store.commit("showEditor");
            Treditor.stop();

            this.engineStarted = false;
            this.paused = false;
        },
        onPause() {
            if (!this.engineStarted) return;

            Treditor.pause();

            this.paused = true;
        },
    },
};
</script>

<style lang="scss" scoped>
</style>