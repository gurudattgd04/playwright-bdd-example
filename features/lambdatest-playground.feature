Feature: Lambdatest playground website automation

    Background: Visit Lambdatest playground
        When I visit lambdatest playground

    Scenario: Lambdatest site access
        Then I should see the page "Your Store"

    Scenario: Validate product search
        And I search for product "ipod shuffle"
        Then I should see 4 products in the search result page