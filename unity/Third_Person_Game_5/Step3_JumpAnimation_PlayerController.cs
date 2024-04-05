using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float moveSpeed = 5f;
    private Animator animator;
    private Rigidbody rb;
    [SerializeField] float jumpForce = 50f;
    private bool isGrounded = true;

    private void Start()
    {
        rb = GetComponent<Rigidbody>();
        animator = GetComponent<Animator>();
    }

    // Update is called once per frame
    private void Update()
    {
        //HandleMovementWithStandardCamera();
        HandleMovementWithFreeLookCamera();
        HandleAttack();
        HandleSuperSpeed();
        HandleJump();
    }

    private void HandleMovementWithStandardCamera()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        float verticalInput = Input.GetAxis("Vertical");

        var moveInput = new Vector3(horizontalInput, 0, verticalInput);

        // Move the character based on the moveInput vector
        transform.position += moveInput * moveSpeed * Time.deltaTime;

        // Only rotate the character if there is movement input
        if (moveInput != Vector3.zero)
        {
            transform.rotation = Quaternion.LookRotation(moveInput);
        }

        // Update the animator's moveAmount to show animation movement
        float moveAmount = Mathf.Clamp01(Mathf.Abs(horizontalInput) + Mathf.Abs(verticalInput));
        animator.SetFloat("moveAmount", moveAmount);
    }

    private void HandleMovementWithFreeLookCamera()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        float verticalInput = Input.GetAxis("Vertical");

        // These vectors represent the forward and right direction based on the camera orientation
        Vector3 forward = Camera.main.transform.forward;
        Vector3 right = Camera.main.transform.right;

        // Ensure movement is horizontal on the ground plane
        forward.y = 0f;
        right.y = 0f;
        forward.Normalize();
        right.Normalize();

        // Calculate direction relative to camera's orientation
        Vector3 direction = (forward * verticalInput + right * horizontalInput).normalized;

        // Move the character based on the direction vector
        transform.position += direction * moveSpeed * Time.deltaTime;

        // Only rotate the character to face the moving direction if there is movement input
        if (direction != Vector3.zero)
        {
            transform.rotation = Quaternion.LookRotation(direction);
        }

        // Update the animator's moveAmount to show animation movement
        float moveAmount = Mathf.Clamp01(Mathf.Abs(horizontalInput) + Mathf.Abs(verticalInput));
        animator.SetFloat("moveAmount", moveAmount);
    }

    private void HandleAttack()
    {
        if (Input.GetKeyDown(KeyCode.Mouse0))
        {
            // Activate the attack animation
            animator.SetTrigger("AttackTrigger");
        }
    }

    private void HandleSuperSpeed()
    {
        if (Input.GetKeyDown(KeyCode.C))
        {
            moveSpeed += 50f;
        }

        if (Input.GetKeyUp(KeyCode.C))
        {
            moveSpeed -= 50f;
        }
    }

    private void HandleJump()
    {
        // Check for jump input (default is space key in Unity)
        if (Input.GetButtonDown("Jump") && isGrounded == true)
        {
            isGrounded = false; // Prevent multiple jumps while in the air
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
            animator.SetBool("isJumping", true);
        }
    }

    // Detect collision with the ground
    private void OnCollisionEnter(Collision collision)
    {
        // Assuming your ground has a tag named "Ground"
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = true;
            animator.SetBool("isJumping", false);
        }
    }

}