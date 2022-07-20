
Feature: Gaji Gesa API Points Feature
  In order to have improve user engagement
  As a user
  I want to make transactions to earn points

@gaji_gesa

Scenario: As an existing user I want to add point(s) to employee
    Given I have an existing user
    When I login to Gaji Gesa
    Then user get OTP response code 201
    Then the user have the otp token
    Given user has to confirm OTP
    When the user sends the OTP confirmation
    Then client access token is created
    Given I add GG points to employee
    When I submit add point request
    Then user has new GG points

