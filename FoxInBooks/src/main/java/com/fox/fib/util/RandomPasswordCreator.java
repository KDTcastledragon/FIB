package com.fox.fib.util;

import java.security.SecureRandom;

public class RandomPasswordCreator {
	private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String SPECIAL = "!@#$%^&";

    private static final String ALL_CHARACTERS = UPPER + SPECIAL;

    public static String generateRandomPassword(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        password.append(getRandomChar(UPPER, random));
        password.append(getRandomChar(SPECIAL, random));

        for (int i = 2; i < length; i++) {
            password.append(getRandomChar(ALL_CHARACTERS, random));
        }

        char[] passwordArray = password.toString().toCharArray();
        for (int i = passwordArray.length - 1; i > 0; i--) {
            int index = random.nextInt(i + 1);
            char temp = passwordArray[index];
            passwordArray[index] = passwordArray[i];
            passwordArray[i] = temp;
        }

        return new String(passwordArray);
    }

    private static char getRandomChar(String characterSet, SecureRandom random) {
        int randomIndex = random.nextInt(characterSet.length());
        return characterSet.charAt(randomIndex);
    }
}
