import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
interface DismissKeyboardProps {
    dismissAction?: () => void;
    children: JSX.Element;
}
export default (props: DismissKeyboardProps) => (
    <TouchableWithoutFeedback onPress={() => (props.dismissAction) ? props.dismissAction() : Keyboard.dismiss()}>
        {props.children}
    </TouchableWithoutFeedback>
);