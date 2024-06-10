Feature: Lambdatest playground website automation

    Scenario Outline: Validate user login <username>
        When I visit lambdatest playground login page
        When I login with username "<username>" and password "<password>"
        Then I should see the page "My Account"
        When I logout
        Examples:
            | username        | password  |
            | asdas@asdas.com | Test1234! |
            | assa@as.com     | Test1234! |

    # Data Table example
    Scenario: Validate product details
        When I access HTC product
        Then I should see product details
            | Brand         | HTC |
            | Reward Points | 400 |

