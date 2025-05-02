import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions: Record<WeatherProps["condition"], { iconName: React.ComponentProps<typeof Ionicons>["name"], gradient: [string, string, ...string[]], title: string, subtitle: string }> = {
    Rain: {
        iconName: "rainy",
        gradient: ["#000046", "#243B55"],
        title: "На вулиці дождь",
        subtitle: "А це означає, що скоро буде веселка!",
    },
    Thunderstorm: {
        iconName: "thunderstorm",
        gradient: ["#141E30", "#243B55"],
        title: "Сиди вдома",
        subtitle: "Ти бачиш, що на вулиці?",
    },
    Drizzle: {
        iconName: "rainy-outline",
        gradient: ["#3a7bd5", "#3a6073"],
        title: "Візьми парасолю",
        subtitle: "Можливо скоро дождь сильнішим стане",
    },
    Snow: {
        iconName: "snow",
        gradient: ["#83a4d4", "#b6fbff"],
        title: "На вулиці сніг!",
        subtitle: "Одягайтеся тепліше",
    },
    Dust: {
        iconName: "cloudy-outline",
        gradient: ["#B79891", "#94716B"],
        title: "Запорошено",
        subtitle: "Ліпше закрий вікна",
    },
    Smoke: {
        iconName: "cloudy-outline",
        gradient: ["#56CCF2", "#2F80ED"],
        title: "На вулиці смог :(",
        subtitle: "Не раджу виходити без необхідності",
    },
    Haze: {
        iconName: "partly-sunny-outline",
        gradient: ["#3E5151", "#DECBA4"],
        title: "Сьогодні туманно",
        subtitle: "Зовні трохи незрозуміло..",
    },
    Mist: {
        iconName: "cloudy-outline",
        gradient: ["#606c88", "#3f4c6b"],
        title: "Нічого не видно в тумані",
        subtitle: "Попереду низька видимість.",
    },
    Clear: {
        iconName: "sunny",
        gradient: ["#56CCF2", "#2F80ED"],
        title: "Погода супер :)",
        subtitle: "Насолоджуйтесь сонячним днем!",
    },
    Clouds: {
        iconName: "cloudy",
        gradient: ["#757F9A", "#D7DDE8"],
        title: "Хмарно",
        subtitle: "Сьогодні хмарне небо.",
    }
}

interface WeatherProps {
    temp: number;
    condition: "Thunderstorm" | "Drizzle" | "Rain" | "Snow" | "Clear" | "Clouds" | "Dust" | "Smoke" | "Haze" | "Mist";
}

export default function Weather({ temp, condition }: WeatherProps) {
    return (
        <LinearGradient 
            colors={weatherOptions[condition].gradient}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.halfContainer}>
                <Ionicons name={weatherOptions[condition].iconName} size={96} color="#FFFFFF"/>
                <Text style={styles.temp}>{temp}°</Text>
            </View>
            <View style={[styles.halfContainer, styles.textContainer]}>
                <Text style={styles.title}>{weatherOptions[condition].title}</Text>
                <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
            </View>
        </LinearGradient>
    )
}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf(["Thunderstorm", "Drizzle", "Rain", "Snow", "Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Dust", "Ash", "Squall", "Tornado", "Clear", "Clouds"]).isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    temp: {
        fontSize: 42,
        color: "#FFFFFF",
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: "flex-start",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 44,
        fontWeight: "300",
        marginBottom: 10,
    },
    subtitle: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 24,
    }
})
