/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import { Button, Image, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CardFront from "./components/CardFront";
import CardBack from "./components/CardBack";

const App = () => {
	const months: string[] = ["MM", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	const years: string[] = ["YY", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027"];

	const [cardNo, setCardNo] = useState<string>("");
	const [cardHolder, setCardHolder] = useState<string>("");
	const [expireMonth, setExpireMonth] = useState<string>("");
	const [expireDate, setExpireDate] = useState<string>("");
	const [cvv, setCvv] = useState<string>("");
	const [selected, setSelected] = useState<number>(-1);
	const [numberField, setNumberField] = useState<string>("####  ####  ####  ####");
	const [issuer, setIssuer] = useState<string>("visa");
	const [limit, setLimit] = useState<number>(16);

	const cardInput = (text: string) => {
		text = text.replace(/\s/g, "");
		text.length
		let s = "";
		let counter = 0;

		for (let i = 0; i < text.length - 1; ++i) {
			s += text[i];
			counter++;
			if (counter == 4) { s += "  "; counter = 0; }
		}

		text.length > 0 ? s += text[text.length - 1] : s = "";

		let first: string = s.substr(0,1);

		switch (first) {
			case "4": setIssuer("visa"); setLimit(16);
				break;
			
			case "5": setIssuer("mastercard"); setLimit(16);
				break;
			
			case "3": setIssuer("amex"); setLimit(15);
				break;
			
			case "6": setIssuer("discover"); setLimit(16);
				break;

			default: setIssuer("visa"); setLimit(16);
				break;
		}

		setCardNo(s);
		let n = s.length;
		let tags = "####  ####  ####  ####";
		let str = s + tags.substr(n);

		setNumberField(str);
	}

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
					<View style={styles.wrapper}>
						{selected == 4 ? (
							<CardBack cvv={cvv} issuer={issuer} />
						) : (
								<CardFront
									selected={selected}
									cardNo={numberField}
									cardHolder={cardHolder}
									expireMonth={expireMonth}
									expireYear={expireDate}
									issuer={issuer}
								/>
							)}

						<View style={styles.contentWrap}>
							<View style={styles.content}>
								<View>
									<Text style={styles.labels}>Card Number</Text>
									<TextInput
										placeholder=""
										keyboardType="numeric"
										style={[styles.inputs, styles.largeInput, selected == 0 ? styles.focused : {}]}
										selectionColor={orange}
										maxLength={22}
										value={cardNo}
										onChangeText={(text) => cardInput(text)}
										onFocus={() => setSelected(0)}
										onBlur={() => setSelected(-1)}
									/>
								</View>

								<View>
									<Text style={styles.labels}>Card Holder</Text>
									<TextInput
										style={[styles.inputs, styles.largeInput, selected == 1 ? styles.focused : {}]}
										selectionColor={orange}
										placeholder=""
										maxLength={18}
										value={cardHolder}
										onChangeText={(text) => setCardHolder(text)}
										onFocus={() => setSelected(1)}
										onBlur={() => setSelected(-1)}
									/>
								</View>

								<View style={styles.smallInputContainer}>
									<View style={{ flex: 3 }}>
										<Text style={styles.labels}>Expiration Date</Text>
										<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
											<View
												style={[styles.inputs, styles.smallInput, { flex: 3 }, selected == 2 ? styles.focused : {}]}
												onTouchStart={() => setSelected(2)}>
												<Picker
													prompt="Month"
													mode="dropdown"
													selectedValue={expireMonth}
													onValueChange={(value) => {
														setSelected(-1);
														setExpireMonth(value.toString());
													}}>
													{months.map((month: string, i: number) => (
														<Picker.Item key={i} label={month} value={month} />
													))}
												</Picker>
											</View>

											<View
												style={[
													styles.inputs,
													styles.smallInput,
													{ flex: 3, marginLeft: 10 },
													selected == 3 ? styles.focused : {},
												]}
												onTouchStart={() => setSelected(3)}>
												<Picker
													prompt="Year"
													mode="dropdown"
													selectedValue={expireDate}
													onValueChange={(value) => {
														setExpireDate(value.toString());
													}}>
													{years.map((year: string, i: number) => (
														<Picker.Item key={i} label={year} value={year} />
													))}
												</Picker>
											</View>
										</View>
									</View>

									<View style={{ flex: 1, paddingLeft: 10 }}>
										<Text style={styles.labels}>CVV</Text>
										<View style={{ flexDirection: "row" }}>
											<TextInput
												placeholder=""
												keyboardType="numeric"
												maxLength={3}
												onFocus={() => setSelected(4)}
												onBlur={() => setSelected(-1)}
												value={cvv}
												onChangeText={(text) => setCvv(text)}
												style={[styles.inputs, styles.smallInput, selected == 4 ? styles.focused : {}]}
											/>
										</View>
									</View>
								</View>
								<View style={{ marginTop: 10, overflow: "hidden", borderRadius: 5 }}>
									<Button onPress={() => { }} title="Submit" color="#ff852e" />
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

const orange: string = "#ff852e";
const lightOrange: string = "#ffcfad";

const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: lightOrange,
	},

	wrapper: {
		width: "100%",
		height: 715,
		borderBottomColor: "red",
		marginTop: 20,
		alignItems: "center",
	},

	contentWrap: {
		height: 400,
		width: "95%",
		marginTop: 100,
		borderRadius: 10,
		overflow: "hidden",
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 15,
		backgroundColor: "white",
	},

	content: {
		width: "100%",
		overflow: "hidden",
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "stretch",
	},

	labels: {
		fontSize: 12,
		fontWeight: "bold",
	},

	inputs: {
		borderWidth: 2,
		borderRadius: 5,
		borderColor: "#dbdbdb",
		height: 50,
		marginBottom: 10,
	},
	largeInput: {},
	smallInputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	smallInput: {
		flex: 2,
		justifyContent: "center",
	},

	focused: {
		borderColor: orange,
	},
});

export default App;
